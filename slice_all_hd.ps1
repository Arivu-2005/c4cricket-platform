Add-Type -AssemblyName System.Drawing

# 1. Slice Quad Cards from ref_quad_cards.png
$file1 = Join-Path (Get-Location) "ref_quad_cards.png"
$bmp1 = [System.Drawing.Bitmap]::FromFile($file1)
Write-Output "ref_quad_cards.png: $($bmp1.Width)x$($bmp1.Height)"

# The image has 4 high-res cards side by side
# Width: 1024 (or similar), 4 equal slices
$w = [int]($bmp1.Width / 4)
$h = $bmp1.Height

for ($i = 0; $i -lt 4; $i++) {
    $x = $i * $w
    $rect = New-Object System.Drawing.Rectangle($x, 0, $w, $h)
    $slice = $bmp1.Clone($rect, $bmp1.PixelFormat)
    $names = @("card_academies_hd.png", "card_turfs_hd.png", "card_shops_hd.png", "card_tournaments_hd.png")
    $outPath = Join-Path (Get-Location) "images\$($names[$i])"
    $slice.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $slice.Save((Join-Path (Get-Location) "$($names[$i])"), [System.Drawing.Imaging.ImageFormat]::Png)
    $slice.Dispose()
    Write-Output "Saved $($names[$i])"
}
$bmp1.Dispose()

# 2. Slice from ref_live_centre.png
$file2 = Join-Path (Get-Location) "ref_live_centre.png"
$bmp2 = [System.Drawing.Bitmap]::FromFile($file2)
Write-Output "ref_live_centre.png: $($bmp2.Width)x$($bmp2.Height)"

# We need:
# - Match Hero India batsman (Kohli + Rohit celebratory hero visual in center)
# - Latest News Stadium (bottom left micro tile 1)
# - Match Analysis Ball (bottom micro tile 2)
# - Player Updates Batsman (bottom micro tile 3)
# - IPL Updates Trophy (bottom micro tile 4)
# Let's inspect coordinates on bmp2:
# Width is around 1024, Height around 512
# The 4 tiles are at the bottom left of the desktop card.
$w2 = $bmp2.Width
$h2 = $bmp2.Height

# Micro tiles are roughly at:
# Y: 375 to 475
# Tile 1 (Stadium): X around 28 to 188
# Tile 2 (Ball): X around 202 to 362
# Tile 3 (Batsman): X around 376 to 536
# Tile 4 (IPL Trophy): X around 550 to 710

function Crop-Ref2($x, $y, $cw, $ch, $out) {
    $rect = New-Object System.Drawing.Rectangle([int]$x, [int]$y, [int]$cw, [int]$ch)
    $slice = $bmp2.Clone($rect, $bmp2.PixelFormat)
    $slice.Save((Join-Path (Get-Location) "images\$out"), [System.Drawing.Imaging.ImageFormat]::Png)
    $slice.Save((Join-Path (Get-Location) "$out"), [System.Drawing.Imaging.ImageFormat]::Png)
    $slice.Dispose()
    Write-Output "Saved $out"
}

# Match Hero celebration image (Kohli & Rohit celebrating):
# In the hero card: X around 250 to 465, Y around 145 to 330
Crop-Ref2 ($w2 * 0.25) ($h2 * 0.29) ($w2 * 0.215) ($h2 * 0.36) "hero_celebration.png"

# Micro tile 1 (Stadium)
Crop-Ref2 ($w2 * 0.028) ($h2 * 0.74) ($w2 * 0.155) ($h2 * 0.19) "tile_stadium_hd.png"

# Micro tile 2 (Ball)
Crop-Ref2 ($w2 * 0.20) ($h2 * 0.74) ($w2 * 0.155) ($h2 * 0.19) "tile_ball_hd.png"

# Micro tile 3 (Batsman)
Crop-Ref2 ($w2 * 0.375) ($h2 * 0.74) ($w2 * 0.155) ($h2 * 0.19) "tile_batsman_hd.png"

# Micro tile 4 (IPL Trophy)
Crop-Ref2 ($w2 * 0.55) ($h2 * 0.74) ($w2 * 0.155) ($h2 * 0.19) "tile_ipl_trophy_hd.png"

$bmp2.Dispose()
Write-Output "Done slicing all 8 HD UI components!"
