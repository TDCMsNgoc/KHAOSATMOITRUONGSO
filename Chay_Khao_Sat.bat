@echo off
chcp 65001 >nul
title HỆ THỐNG KHẢO SÁT NCKH - CAO ĐẲNG CÔNG NGHỆ THỦ ĐỨC (TDC)
cls
echo =========================================================================
echo       HỆ THỐNG KHẢO SÁT ĐỀ TÀI NGHIÊN CỨU KHOA HỌC (TDC 2026-2027)
echo =========================================================================
echo.
echo Đang khởi động máy chủ khảo sát trên máy tính của bạn...
echo.

start "" "http://localhost:8080"

echo [1] Trang làm bài khảo sát:         http://localhost:8080
echo [2] Trang Quản trị & Thống kê:      http://localhost:8080/admin
echo.
echo Lưu ý: Hãy GIỮ NGUYÊN cửa sổ này trong khi khảo sát.
echo Đóng cửa sổ này khi bạn muốn dừng máy chủ.
echo =========================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

pause
