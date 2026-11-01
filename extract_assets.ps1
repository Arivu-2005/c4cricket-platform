Add-Type -AssemblyName System.Drawing
$file = Join-Path (Get-Location) "hero_banner_ref.png"
$src = [System.Drawing.Bitmap]::FromFile($file)
Write-Output "Source Dimensions: $($src.Width)x$($src.Height)"

# Crop batsmancutout from the right side of the banner (approx X: 750 to 1024, Y: 80 to 290)
$cropRect = New-Object System.Drawing.Rectangle(770, 78, 245, 215)
$batsmanBmp = $src.Clone($cropRect, $src.PixelFormat)
$batsmanOut = Join-Path (Get-Location) "hero_batsman.png"
$batsmanBmp.Save($batsmanOut, [System.Drawing.Imaging.ImageFormat]::Png)
$batsmanBmp.Dispose()

# Also crop the stadium background from the center without the text, or we can use the high quality banner directly!
Write-Output "Successfully extracted hero_batsman.png"
$src.Dispose()
