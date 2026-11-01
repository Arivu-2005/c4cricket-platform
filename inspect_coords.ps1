Add-Type -AssemblyName System.Drawing
$refFile = "C:\Users\ariva\.gemini\antigravity\brain\966711e8-e05f-4f9d-a2c5-f7af68bafc90\.user_uploaded\media_1793501505165_fe19c18d.jpg"
$src = [System.Drawing.Bitmap]::FromFile($refFile)
Write-Output "Ref Dimensions: $($src.Width)x$($src.Height)"

# Let's extract:
# 1. Hero background / batsman if ultra-crisp
# 2. Quad cards real images from reference:
# Explore Everything Cards (Y roughly 400 to 500)
# Let's inspect where sections lie by sampling slices or coordinates.
# Card 1 (Academies): X roughly 58 to 195, Y roughly 400 to 450
# Let's save a test slice map
$src.Dispose()
Write-Output "Done"
