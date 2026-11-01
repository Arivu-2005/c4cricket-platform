Add-Type -AssemblyName System.Drawing
$refFile = Join-Path (Get-Location) "hero_banner_full.png"
$src = [System.Drawing.Bitmap]::FromFile($refFile)
Write-Output "Hero Banner Full Dimensions: $($src.Width)x$($src.Height)"

# The total height is 306 (or similar).
# Top bar: Y: 0 to ~48 (Header navbar)
# Sub-bar / mini ticker: Y: ~48 to ~76
# Hero section: Y: ~76 to ~268
# Yellow bottom nav: Y: ~268 to ~306

# Let's crop the pure hero banner section (from below the ticker down to just above the yellow nav, or full stadium):
# Width 1024, Height around 195 (from Y: 75 to Y: 270)
$heroRect = New-Object System.Drawing.Rectangle(0, 72, $src.Width, 198)
$heroBmp = $src.Clone($heroRect, $src.PixelFormat)
$heroBmp.Save((Join-Path (Get-Location) "images\hero_stadium_banner.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$heroBmp.Save((Join-Path (Get-Location) "hero_stadium_banner.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$heroBmp.Dispose()
Write-Output "Saved hero_stadium_banner.png"

$src.Dispose()
