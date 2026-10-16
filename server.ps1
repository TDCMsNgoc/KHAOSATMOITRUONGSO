# PowerShell Local Survey Server for TDC Research
# Zero external dependencies (uses built-in .NET HttpListener)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$publicDir = Join-Path $scriptDir "public"
$dataDir = Join-Path $scriptDir "data"
$jsonFile = Join-Path $dataDir "responses.json"
$csvFile = Join-Path $dataDir "responses.csv"
$seedFile = Join-Path $dataDir "sample_seed.json"

if (!(Test-Path $dataDir)) {
    New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
}

if (!(Test-Path $jsonFile)) {
    "[]" | Set-Content -Path $jsonFile -Encoding UTF8
}

$csvHeaders = @(
    "ID", "Timestamp", "A1_NamHoc", "A1_NamHoc_Text", "A2_Khoa", "A2_Nganh", "A3_Internet",
    "B1_1", "B1_2", "B1_3",
    "B2_1", "B2_2", "B2_3", "B2_4",
    "B3_1", "B3_2", "B3_3", "B3_4",
    "B4_1", "B4_2", "B4_3", "B4_4",
    "B5_1", "B5_2", "B5_3", "B5_4",
    "B6_1", "B6_2", "B6_3",
    "B7_1", "B7_2", "B7_3", "B7_4",
    "B8_1", "B8_1_Text",
    "F_VIEW", "F_MUSIC", "F_RL", "F_GAME", "F_SOCIAL", "F_CREATIVE", "F_INTERNAL", "F_NICHE",
    "C9_ThoiGian", "C9_ThoiGian_Text"
)

function Escape-CsvField([string]$val) {
    if ($null -eq $val) { return '""' }
    $clean = $val.Replace('"', '""')
    return "`"$clean`""
}

function Sync-CsvFromResponses($responsesList) {
    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add(($csvHeaders -join ","))

    foreach ($r in $responsesList) {
        $row = @()
        $row += Escape-CsvField $r.id
        $row += Escape-CsvField $r.timestamp
        $row += Escape-CsvField $r.A1_NamHoc
        $row += Escape-CsvField $r.A1_NamHoc_Text
        $row += Escape-CsvField $r.A2_Khoa
        $row += Escape-CsvField $r.A2_Nganh
        $row += Escape-CsvField $r.A3_Internet

        # Activities B1 to B8
        $actKeys = @(
            "B1_1", "B1_2", "B1_3",
            "B2_1", "B2_2", "B2_3", "B2_4",
            "B3_1", "B3_2", "B3_3", "B3_4",
            "B4_1", "B4_2", "B4_3", "B4_4",
            "B5_1", "B5_2", "B5_3", "B5_4",
            "B6_1", "B6_2", "B6_3",
            "B7_1", "B7_2", "B7_3", "B7_4",
            "B8_1"
        )
        foreach ($ak in $actKeys) {
            $v = 0
            if ($r.activities -and $r.activities.PSObject.Properties[$ak]) {
                $v = $r.activities.$ak
            }
            $row += $v
        }
        $row += Escape-CsvField $r.B8_1_Text

        # Frequencies Likert
        $likertKeys = @("F_VIEW", "F_MUSIC", "F_RL", "F_GAME", "F_SOCIAL", "F_CREATIVE", "F_INTERNAL", "F_NICHE")
        foreach ($lk in $likertKeys) {
            $lv = 1
            if ($r.frequencies -and $r.frequencies.PSObject.Properties[$lk]) {
                $lv = $r.frequencies.$lk
            } elseif ($r.PSObject.Properties[$lk]) {
                $lv = $r.$lk
            }
            $row += $lv
        }

        # C9
        $row += Escape-CsvField $r.C9_ThoiGian
        $row += Escape-CsvField $r.C9_ThoiGian_Text

        $lines.Add(($row -join ","))
    }

    [System.IO.File]::WriteAllLines($csvFile, $lines, [System.Text.Encoding]::UTF8)
}

# Initial CSV sync
if (Test-Path $jsonFile) {
    try {
        $raw = Get-Content -Path $jsonFile -Raw -Encoding UTF8
        if ($raw) {
            $existing = ConvertFrom-Json $raw
            if ($existing) { Sync-CsvFromResponses $existing }
        }
    } catch {}
}

# Port configuration
$port = 8080
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    $port = 8081
    $listener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$port/"
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   HE THONG KHAO SAT NCKH - CAO DANG CONG NGHE THU DUC (TDC)" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " Server dang chay tai:   $prefix" -ForegroundColor Yellow
Write-Host " Trang khao sat:         $prefix" -ForegroundColor White
Write-Host " Trang quan tri/so lieu: $($prefix)admin" -ForegroundColor White
Write-Host " Nhan Ctrl + C de dung may chu." -ForegroundColor Gray
Write-Host "=================================================================" -ForegroundColor Cyan

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Add CORS headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $urlPath = $request.Url.AbsolutePath
        $method = $request.HttpMethod

        # Helper to send string response
        function Send-String($str, $contentType, $statusCode = 200) {
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($str)
            $response.StatusCode = $statusCode
            $response.ContentType = "$contentType; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
        }

        # Helper to send file
        function Send-File($filePath, $contentType) {
            if (Test-Path $filePath) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.StatusCode = 200
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Close()
            } else {
                Send-String "File Not Found" "text/plain" 404
            }
        }

        # Routing
        if ($method -eq "GET" -and ($urlPath -eq "/" -or $urlPath -eq "/index.html")) {
            Send-File (Join-Path $publicDir "index.html") "text/html; charset=utf-8"
        }
        elseif ($method -eq "GET" -and ($urlPath -eq "/admin" -or $urlPath -eq "/admin.html")) {
            Send-File (Join-Path $publicDir "admin.html") "text/html; charset=utf-8"
        }
        elseif ($method -eq "GET" -and $urlPath -eq "/style.css") {
            Send-File (Join-Path $publicDir "style.css") "text/css; charset=utf-8"
        }
        elseif ($method -eq "GET" -and $urlPath -eq "/app.js") {
            Send-File (Join-Path $publicDir "app.js") "application/javascript; charset=utf-8"
        }
        elseif ($method -eq "GET" -and $urlPath -eq "/admin.js") {
            Send-File (Join-Path $publicDir "admin.js") "application/javascript; charset=utf-8"
        }
        # API: Get all responses
        elseif ($method -eq "GET" -and $urlPath -eq "/api/responses") {
            $jsonContent = "[]"
            if (Test-Path $jsonFile) {
                $raw = Get-Content -Path $jsonFile -Raw -Encoding UTF8
                if ($raw) { $jsonContent = $raw }
            }
            Send-String $jsonContent "application/json"
        }
        # API: Submit response
        elseif ($method -eq "POST" -and $urlPath -eq "/api/submit") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()
            $payload = ConvertFrom-Json $body

            $allList = New-Object System.Collections.ArrayList
            if (Test-Path $jsonFile) {
                $raw = Get-Content -Path $jsonFile -Raw -Encoding UTF8
                if ($raw) {
                    $existing = ConvertFrom-Json $raw
                    if ($existing) {
                        foreach ($it in $existing) { [void]$allList.Add($it) }
                    }
                }
            }

            # Generate ID: TDC_001, TDC_002...
            $newNum = $allList.Count + 1
            $idStr = "TDC_" + $newNum.ToString("D3")
            $payload | Add-Member -NotePropertyName "id" -NotePropertyValue $idStr -Force
            $payload | Add-Member -NotePropertyName "timestamp" -NotePropertyValue (Get-Date).ToString("yyyy-MM-dd HH:mm:ss") -Force

            [void]$allList.Add($payload)

            $newJson = ConvertTo-Json @($allList) -Depth 10
            [System.IO.File]::WriteAllText($jsonFile, $newJson, [System.Text.Encoding]::UTF8)
            Sync-CsvFromResponses $allList

            Send-String (ConvertTo-Json @{ success = $true; id = $idStr }) "application/json"
        }
        # API: Delete single response
        elseif ($method -eq "DELETE" -and $urlPath -eq "/api/response") {
            $delId = $request.QueryString["id"]
            if ($delId -and (Test-Path $jsonFile)) {
                $raw = Get-Content -Path $jsonFile -Raw -Encoding UTF8
                $existing = ConvertFrom-Json $raw
                $remaining = @($existing | Where-Object { $_.id -ne $delId })
                $newJson = ConvertTo-Json $remaining -Depth 10
                [System.IO.File]::WriteAllText($jsonFile, $newJson, [System.Text.Encoding]::UTF8)
                Sync-CsvFromResponses $remaining
                Send-String (ConvertTo-Json @{ success = $true }) "application/json"
            } else {
                Send-String (ConvertTo-Json @{ success = $false; message = "ID not provided" }) "application/json" 400
            }
        }
        # API: Seed 10 mock survey responses
        elseif ($method -eq "POST" -and $urlPath -eq "/api/seed") {
            $allList = New-Object System.Collections.ArrayList
            if (Test-Path $jsonFile) {
                $raw = Get-Content -Path $jsonFile -Raw -Encoding UTF8
                if ($raw) {
                    $existing = ConvertFrom-Json $raw
                    if ($existing) {
                        foreach ($it in $existing) { [void]$allList.Add($it) }
                    }
                }
            }

            $addedCount = 0
            if (Test-Path $seedFile) {
                $seedRaw = Get-Content -Path $seedFile -Raw -Encoding UTF8
                $seedItems = ConvertFrom-Json $seedRaw
                foreach ($item in $seedItems) {
                    $newNum = $allList.Count + 1
                    $idStr = "TDC_" + $newNum.ToString("D3")
                    $item | Add-Member -NotePropertyName "id" -NotePropertyValue $idStr -Force
                    $item | Add-Member -NotePropertyName "timestamp" -NotePropertyValue (Get-Date).AddMinutes(- ($newNum * 15)).ToString("yyyy-MM-dd HH:mm:ss") -Force
                    [void]$allList.Add($item)
                    $addedCount++
                }
            }

            $newJson = ConvertTo-Json @($allList) -Depth 10
            [System.IO.File]::WriteAllText($jsonFile, $newJson, [System.Text.Encoding]::UTF8)
            Sync-CsvFromResponses $allList

            Send-String (ConvertTo-Json @{ success = $true; added = $addedCount }) "application/json"
        }
        # API: Clear all responses
        elseif ($method -eq "POST" -and $urlPath -eq "/api/clear") {
            [System.IO.File]::WriteAllText($jsonFile, "[]", [System.Text.Encoding]::UTF8)
            Sync-CsvFromResponses @()
            Send-String (ConvertTo-Json @{ success = $true }) "application/json"
        }
        # Download CSV
        elseif ($method -eq "GET" -and $urlPath -eq "/download/csv") {
            if (!(Test-Path $csvFile)) {
                Sync-CsvFromResponses @()
            }
            $bytes = [System.IO.File]::ReadAllBytes($csvFile)
            $response.StatusCode = 200
            $response.ContentType = "text/csv; charset=utf-8"
            $response.AddHeader("Content-Disposition", 'attachment; filename="KhaoSat_TiengAnh_So_TDC.csv"')
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
        }
        # Download JSON
        elseif ($method -eq "GET" -and $urlPath -eq "/download/json") {
            if (!(Test-Path $jsonFile)) {
                "[]" | Set-Content -Path $jsonFile -Encoding UTF8
            }
            $bytes = [System.IO.File]::ReadAllBytes($jsonFile)
            $response.StatusCode = 200
            $response.ContentType = "application/json; charset=utf-8"
            $response.AddHeader("Content-Disposition", 'attachment; filename="KhaoSat_TiengAnh_So_TDC.json"')
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
        }
        else {
            Send-String "404 Not Found" "text/plain" 404
        }
    }
    catch {
        Write-Warning "Error processing request: $_"
    }
}
