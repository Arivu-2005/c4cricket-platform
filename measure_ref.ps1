Add-Type -AssemblyName System.Drawing
$refFile = "C:\Users\ariva\.gemini\antigravity\brain\966711e8-e05f-4f9d-a2c5-f7af68bafc90\.user_uploaded\media_1793501505165_fe19c18d.jpg"
$src = [System.Drawing.Bitmap]::FromFile($refFile)
Write-Output "Full Design Ref Dimensions: $($src.Width)x$($src.Height)"
$src.Dispose()
