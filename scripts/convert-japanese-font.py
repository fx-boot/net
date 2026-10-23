"""Recompress the official, unmodified Shippori Mincho outlines as local WOFF2.
Run with fonttools and brotli installed; keeps the full Japanese glyph repertoire.
"""
from fontTools.ttLib import TTFont

font = TTFont('upstream/fonts/ShipporiMincho-Regular.ttf')
font.flavor = 'woff2'
font.save('public/fonts/shippori-mincho-regular.woff2')
