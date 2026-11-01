Add-Type -AssemblyName System.Drawing

$refFile = "C:\Users\ariva\.gemini\antigravity\brain\966711e8-e05f-4f9d-a2c5-f7af68bafc90\.user_uploaded\media_1793501505165_fe19c18d.jpg"
$src = [System.Drawing.Bitmap]::FromFile($refFile)
$w = $src.Width
$h = $src.Height

# Helper crop function
function Crop-Image($x, $y, $width, $height, $outName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $width, $height)
    $bmp = $src.Clone($rect, $src.PixelFormat)
    $outPath = Join-Path (Get-Location) "images\$outName"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Saved images\$outName ($width x $height)"
}

# 1. Quad card 1: Cricket Academies
# In 682x1024, Quad cards section is around Y: 400 to 480.
# Card 1 image is around X: 59, Y: 402, W: 128, H: 42
Crop-Image 59 402 128 42 "card_academies.png"

# 2. Quad card 2: Turfs & Grounds
Crop-Image 195 402 128 42 "card_turfs.png"

# 3. Quad card 3: Sports Shops
Crop-Image 332 402 128 42 "card_shops.png"

# 4. Quad card 4: Tournaments & Events (Gold trophy)
Crop-Image 468 402 128 42 "card_tournaments.png"

# 5. Hero Batsman from high res ref
# Batsman is in top right of hero: X: 540 to 650, Y: 60 to 180
Crop-Image 540 60 115 125 "hero_batsman_crisp.png"

# 6. Pan India Community crowd banner: Y around 750 to 795, W 682, H 45
Crop-Image 0 748 682 50 "community_crowd.png"

$src.Dispose()
Write-Output "All reference visual assets extracted successfully!"
