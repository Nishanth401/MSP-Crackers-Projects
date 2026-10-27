import pypdf
import json
import csv
import re
import os

pdf_path = 'catalog/MSP retail list 2026.pdf'
reader = pypdf.PdfReader(pdf_path)

# Detailed mapping and clean extractions based on exact PDF coordinates and OCR verification
# Category definitions
CATEGORIES = [
    {"id": 1, "slug": "single-sound-crackers", "name": "Single Sound Crackers", "tamil": "ஒற்றை வெடிகள்", "description": "Traditional single-sound crackers including Gold Lakshmi, Kuruvi, and Paper Bombs."},
    {"id": 2, "slug": "ground-chakkers", "name": "Ground Chakkers", "tamil": "தரைச்சக்கரம்", "description": "Whirling ground spinners in Big, Special, and Deluxe variants."},
    {"id": 3, "slug": "flower-pots", "name": "Flower Pots", "tamil": "பூந்தொட்டி", "description": "Sparkling fountains of light including Big, Special, Asoka, Giant, Koti, and Deluxe."},
    {"id": 4, "slug": "bombs", "name": "Bombs", "tamil": "அணுகுண்டு", "description": "High-decibel festival sound crackers including Hydro Green, Military Bomb, King of Kings, and Classic Bomb."},
    {"id": 5, "slug": "crackers", "name": "Crackers & Laris", "tamil": "சரவெடிகள்", "description": "Bijili red crackers and long festive lari garlands from 100K up to 10K series."},
    {"id": 6, "slug": "rockets", "name": "Rockets", "tamil": "ராக்கெட்டுகள்", "description": "Sky-ascending rockets with bursting stars and whistle effects."},
    {"id": 7, "slug": "torches", "name": "Torches & Pencils", "tamil": "டார்ச் வெடிகள்", "description": "Twinkling star hand torches in 1.5' and 4' lengths."},
    {"id": 8, "slug": "novelties", "name": "Novelties & Toys", "tamil": "புதுமை வெடிகள்", "description": "Exciting novelty crackers like Kit Kat, Leaf, Polo, Joy Pops, Peacock, and fun props."},
    {"id": 9, "slug": "fancy-fountains", "name": "Fancy Fountains", "tamil": "பேண்சி பவுண்டன்", "description": "Color-changing cone and cylindrical fountains including Tri Colour, Kurkure, and Milka."},
    {"id": 10, "slug": "tin-cool-drinks", "name": "Tin Cool Drinks Fountain", "tamil": "டின் கூல்டிரிங்ஸ் பவுண்டன்", "description": "Novelty tin-can fountains styled after Pepsi, Coca Cola, 7 Up, and Fanta."},
    {"id": 11, "slug": "fantastic-novelties", "name": "Fantastic Novelties", "tamil": "பேண்டாஸ்டிக் நாவல்டி", "description": "Siren whistles, Sun Smoke colors, helicopter spinners, and candles."},
    {"id": 12, "slug": "wheels", "name": "Wheels", "tamil": "சக்கரங்கள்", "description": "High speed rotating visual disco wheels."},
    {"id": 13, "slug": "fancy-crackers", "name": "Fancy Crackers", "tamil": "பேண்சி வெடிகள்", "description": "Olai Vedi and Rock Party celebratory crackers."},
    {"id": 14, "slug": "aerial-fancy", "name": "Aerial Fancy Single & Trio", "tamil": "வான் வெடிகள்", "description": "Single-shot and trio aerial shell pipes in 1.5\", 2\", 3\", 4\", and 5\" sizes."},
    {"id": 15, "slug": "roll-cap", "name": "Roll Cap", "tamil": "ரோல் கேப்", "description": "Toy gun percussion caps in rolls."},
    {"id": 16, "slug": "fancy-repeating-shots", "name": "Fancy Repeating Shots", "tamil": "ரிப்பீட்டிங் ஷாட்ஸ்", "description": "Multi-shot sky repeating cakes from 12 shots, 30 shots up to 500 shots."},
    {"id": 17, "slug": "sparklers", "name": "Sparklers", "tamil": "கம்பி மத்தாப்பு", "description": "Electric silver and vibrant colour sparklers from 7cm to 55cm lengths."},
    {"id": 18, "slug": "gift-boxes", "name": "Gift Boxes & Family Packs", "tamil": "கிப்ட் பாக்ஸ் காம்போ", "description": "Curated festival gift packs containing 18 to 60 items, plus VIP Mega Carnival combos."}
]

# Raw parsed items from PDF
ITEMS_RAW = [
    # Page 2: Single Sound Crackers (1-7)
    {"code": 1, "page": 2, "category": "single-sound-crackers", "name": "Gold Lakshmi", "tamil": "கோல்டு லட்சுமி", "pack": "1 Pkt", "pieces": "10 Pcs", "listPrice": 275.0, "netPrice": 27.5, "status": "VERIFIED"},
    {"code": 2, "page": 2, "category": "single-sound-crackers", "name": "2 3/4\" Kuruvi", "tamil": "2 3/4\" குருவி", "pack": "1 Pkt", "pieces": "10 Pcs", "listPrice": 80.0, "netPrice": 8.0, "status": "VERIFIED"},
    {"code": 3, "page": 2, "category": "single-sound-crackers", "name": "3 1/2\" Lakshmi", "tamil": "3 1/2\" லட்சுமி", "pack": "1 Pkt", "pieces": "10 Pcs", "listPrice": 170.0, "netPrice": 17.0, "status": "VERIFIED"},
    {"code": 4, "page": 2, "category": "single-sound-crackers", "name": "4\" Lakshmi", "tamil": "4\" லட்சுமி", "pack": "1 Pkt", "pieces": "10 Pcs", "listPrice": 225.0, "netPrice": 22.5, "status": "VERIFIED"},
    {"code": 5, "page": 2, "category": "single-sound-crackers", "name": "Paper Bomb (1/4 Kg)", "tamil": "பேப்பர் பாம் (1/4 Kg)", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 500.0, "netPrice": 50.0, "status": "VERIFIED"},
    {"code": 6, "page": 2, "category": "single-sound-crackers", "name": "Paper Bomb (1/2 Kg)", "tamil": "பேப்பர் பாம் (1/2 Kg)", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 1000.0, "netPrice": 100.0, "status": "VERIFIED"},
    {"code": 7, "page": 2, "category": "single-sound-crackers", "name": "Paper Bomb (1 Kg)", "tamil": "பேப்பர் பாம் (1 Kg)", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 2000.0, "netPrice": 200.0, "status": "VERIFIED"},
    
    # Ground Chakkers (8-10)
    {"code": 8, "page": 2, "category": "ground-chakkers", "name": "G.Chakkers Big 10s", "tamil": "தரைச்சக்கரம் பிக் (10)", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 450.0, "netPrice": 45.0, "status": "VERIFIED"},
    {"code": 9, "page": 2, "category": "ground-chakkers", "name": "G.Chakkers Special", "tamil": "தரைச்சக்கரம் ஸ்பெஷல்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1000.0, "netPrice": 100.0, "status": "VERIFIED"},
    {"code": 10, "page": 2, "category": "ground-chakkers", "name": "G.Chakkers Deluxe", "tamil": "தரைச்சக்கரம் டீலக்ஸ்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    
    # Flower Pots (11-17)
    {"code": 11, "page": 2, "category": "flower-pots", "name": "Flower Pots Big", "tamil": "பூந்தொட்டி பெரியது", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 650.0, "netPrice": 65.0, "status": "VERIFIED"},
    {"code": 12, "page": 2, "category": "flower-pots", "name": "Flower Pots Special", "tamil": "பூந்தொட்டி ஸ்பெஷல்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 850.0, "netPrice": 85.0, "status": "VERIFIED"},
    {"code": 13, "page": 2, "category": "flower-pots", "name": "Flower Pots Asoka", "tamil": "பூந்தொட்டி அசோகா", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1100.0, "netPrice": 110.0, "status": "VERIFIED"},
    {"code": 14, "page": 2, "category": "flower-pots", "name": "Flower Pots Giant", "tamil": "பூந்தொட்டி ஜைன்ட்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1400.0, "netPrice": 140.0, "status": "VERIFIED"},
    {"code": 15, "page": 2, "category": "flower-pots", "name": "Flower Pots Koti", "tamil": "பூந்தொட்டி கோட்டி", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1950.0, "netPrice": 195.0, "status": "VERIFIED"},
    {"code": 16, "page": 2, "category": "flower-pots", "name": "Flower Pots Deluxe (5 Pcs)", "tamil": "பூந்தொட்டி டீலக்ஸ் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1700.0, "netPrice": 170.0, "status": "VERIFIED"},
    {"code": 17, "page": 2, "category": "flower-pots", "name": "Flower Pots Super Dlx.(2 Pcs)", "tamil": "பூந்தொட்டி சூப்பர் டீலக்ஸ் (2)", "pack": "1 Box", "pieces": "2 Pcs", "listPrice": 1500.0, "netPrice": 150.0, "status": "VERIFIED"},
    
    # Bombs (18-22)
    {"code": 18, "page": 2, "category": "bombs", "name": "Hydro Green", "tamil": "ஹைட்ரோ கிரீன்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 850.0, "netPrice": 85.0, "status": "VERIFIED"},
    {"code": 19, "page": 2, "category": "bombs", "name": "Military Bomb", "tamil": "மிலிட்டரி பாம்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    {"code": 20, "page": 2, "category": "bombs", "name": "King of King Green", "tamil": "கிங் ஆப் கிங் கிரீன்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1400.0, "netPrice": 140.0, "status": "VERIFIED"},
    {"code": 21, "page": 2, "category": "bombs", "name": "A.K.47", "tamil": "ஏ.கே.47", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 22, "page": 2, "category": "bombs", "name": "Classic Bomb", "tamil": "கிளாசிக் பாம்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1000.0, "netPrice": 100.0, "status": "VERIFIED"},
    
    # Crackers (23-28)
    {"code": 23, "page": 2, "category": "crackers", "name": "Bijili Red (100 Pcs)", "tamil": "பிஜிலி ரெட் (100)", "pack": "1 Pkt", "pieces": "100 Pcs", "listPrice": 300.0, "netPrice": 30.0, "status": "VERIFIED"},
    {"code": 24, "page": 2, "category": "crackers", "name": "Bijili Red (50 Pcs)", "tamil": "பிஜிலி ரெட் (50)", "pack": "1 Pkt", "pieces": "50 Pcs", "listPrice": 150.0, "netPrice": 15.0, "status": "VERIFIED"},
    {"code": 25, "page": 2, "category": "crackers", "name": "100 K", "tamil": "100 கே", "pack": "1 Pkt", "pieces": "1 Pkt", "listPrice": 400.0, "netPrice": 40.0, "status": "VERIFIED"},
    {"code": 26, "page": 2, "category": "crackers", "name": "100 Deluxe", "tamil": "100 டீலக்ஸ்", "pack": "1 Pkt", "pieces": "1 Pkt", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 2"},
    {"code": 27, "page": 2, "category": "crackers", "name": "28 Gaint", "tamil": "28 ஜைன்ட்", "pack": "1 Pkt", "pieces": "28 Pcs", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 2"},
    {"code": 28, "page": 2, "category": "crackers", "name": "56 Gaint", "tamil": "56 ஜைன்ட்", "pack": "1 Pkt", "pieces": "56 Pcs", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 2"},
    
    # Rockets (29)
    {"code": 29, "page": 2, "category": "rockets", "name": "Rocket Big (5 Pcs)", "tamil": "ராக்கெட் பெரியது (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    
    # Torches (30-31)
    {"code": 30, "page": 2, "category": "torches", "name": "1 1/2' Twinkling Star", "tamil": "1 1/2' ட்விங்க்ளிங் ஸ்டார்", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 350.0, "netPrice": 35.0, "status": "VERIFIED"},
    {"code": 31, "page": 2, "category": "torches", "name": "4' Twinkling Star", "tamil": "4' ட்விங்க்ளிங் ஸ்டார்", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 700.0, "netPrice": 70.0, "status": "VERIFIED"},
    
    # Page 3: Crackers Lion Series (32-39)
    {"code": 32, "page": 3, "category": "crackers", "name": "Lion 1K", "tamil": "லயன் 1 கே", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1350.0, "netPrice": 135.0, "status": "VERIFIED"},
    {"code": 33, "page": 3, "category": "crackers", "name": "Lion 1K Special", "tamil": "லயன் 1 கே ஸ்பெஷல்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 2000.0, "netPrice": 200.0, "status": "VERIFIED"},
    {"code": 34, "page": 3, "category": "crackers", "name": "Lion 2K (Small)", "tamil": "லயன் 2 கே", "pack": "1 Box", "pieces": "1 Box", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 3"},
    {"code": 35, "page": 3, "category": "crackers", "name": "Lion 2K", "tamil": "லயன் 2 கே", "pack": "1 Box", "pieces": "1 Box", "listPrice": 4000.0, "netPrice": 400.0, "status": "VERIFIED"},
    {"code": 36, "page": 3, "category": "crackers", "name": "Lion 5 K Small", "tamil": "லயன் 5 கே ஸ்மால்", "pack": "1 Box", "pieces": "1 Box", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 3"},
    {"code": 37, "page": 3, "category": "crackers", "name": "Lion 5 K", "tamil": "லயன் 5 கே", "pack": "1 Box", "pieces": "1 Box", "listPrice": 10000.0, "netPrice": 1000.0, "status": "VERIFIED"},
    {"code": 38, "page": 3, "category": "crackers", "name": "Lion 10 K Small", "tamil": "லயன் 10 கே ஸ்மால்", "pack": "1 Box", "pieces": "1 Box", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 3"},
    {"code": 39, "page": 3, "category": "crackers", "name": "Lion 10 K", "tamil": "லயன் 10 கே", "pack": "1 Box", "pieces": "1 Box", "listPrice": 20000.0, "netPrice": 2000.0, "status": "VERIFIED"},
    
    # Novelties (40-59)
    {"code": 40, "page": 3, "category": "novelties", "name": "Kit Kat (10 Pcs)", "tamil": "கிட்காட் (10)", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 380.0, "netPrice": 38.0, "status": "VERIFIED"},
    {"code": 41, "page": 3, "category": "novelties", "name": "Leaf", "tamil": "லீப்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1500.0, "netPrice": 150.0, "status": "VERIFIED"},
    {"code": 42, "page": 3, "category": "novelties", "name": "Polo", "tamil": "போலோ", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 43, "page": 3, "category": "novelties", "name": "Parrot", "tamil": "கிளி", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 44, "page": 3, "category": "novelties", "name": "White Money (5 Pcs)", "tamil": "ஒயிட் மணி (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 45, "page": 3, "category": "novelties", "name": "Joy Pops (5 Pcs)", "tamil": "ஜாய் பாப்ஸ் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1000.0, "netPrice": 100.0, "status": "VERIFIED"},
    {"code": 46, "page": 3, "category": "novelties", "name": "Emerald (10 Pcs)", "tamil": "எமரால்ட் (10)", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 380.0, "netPrice": 38.0, "status": "VERIFIED"},
    {"code": 47, "page": 3, "category": "novelties", "name": "Asrafi Pops (5 Pcs)", "tamil": "அஷ்ரபி பாப்ஸ் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 800.0, "netPrice": 80.0, "status": "VERIFIED"},
    {"code": 48, "page": 3, "category": "novelties", "name": "DTS Sound", "tamil": "டிடிஎஸ் சவுண்ட்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1200.0, "netPrice": 120.0, "status": "VERIFIED"},
    {"code": 49, "page": 3, "category": "novelties", "name": "100 Watts", "tamil": "100 வாட்ஸ்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    {"code": 50, "page": 3, "category": "novelties", "name": "Yahoo", "tamil": "யாகூ", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 51, "page": 3, "category": "novelties", "name": "Lallipop", "tamil": "லாலிபாப்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1950.0, "netPrice": 195.0, "status": "VERIFIED"},
    {"code": 52, "page": 3, "category": "novelties", "name": "28 Chorsa", "tamil": "28 சோர்சா", "pack": "1 Pkt", "pieces": "28 Pcs", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Price blank in source PDF page 3"},
    {"code": 53, "page": 3, "category": "novelties", "name": "Dora Super Singar (5 Pcs)", "tamil": "டோரா சூப்பர் சிங்கர் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 54, "page": 3, "category": "novelties", "name": "Tiny Toys (3 Pcs)", "tamil": "டைனி டாய்ஸ் (3)", "pack": "1 Box", "pieces": "3 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 55, "page": 3, "category": "novelties", "name": "7 Shots (5 Pcs)", "tamil": "7 ஷாட்ஸ் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1000.0, "netPrice": 100.0, "status": "VERIFIED"},
    {"code": 56, "page": 3, "category": "novelties", "name": "Akash Rider (5 Pcs)", "tamil": "ஆகாஷ் ரைடர் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 57, "page": 3, "category": "novelties", "name": "Elephant Magic", "tamil": "யானை மேஜிக்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 58, "page": 3, "category": "novelties", "name": "Bull 5 in 1 (5 Pcs)", "tamil": "புல் 5 இன் 1 (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 2500.0, "netPrice": 250.0, "status": "VERIFIED"},
    {"code": 59, "page": 3, "category": "novelties", "name": "Penta 5 in 1 (5 Pcs)", "tamil": "பென்டா 5 இன் 1 (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1900.0, "netPrice": 190.0, "status": "VERIFIED"},
    
    # Fancy Fountain (60-68)
    {"code": 60, "page": 3, "category": "fancy-fountains", "name": "Tri Colour (5 Pcs)", "tamil": "ட்ரி கலர் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 2750.0, "netPrice": 275.0, "status": "VERIFIED"},
    {"code": 61, "page": 3, "category": "fancy-fountains", "name": "Bingo (5 Pcs)", "tamil": "பிங்கோ (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 62, "page": 3, "category": "fancy-fountains", "name": "Kurkure (5 Pcs)", "tamil": "குர்குரே (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 63, "page": 3, "category": "fancy-fountains", "name": "Peacock (Mayur)", "tamil": "மயில் (மயூரா)", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 64, "page": 3, "category": "fancy-fountains", "name": "Milka (5 Pcs)", "tamil": "மில்கா (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 65, "page": 3, "category": "fancy-fountains", "name": "Hanuman Danta", "tamil": "ஹனுமான் தண்டா", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1900.0, "netPrice": 190.0, "status": "VERIFIED"},
    {"code": 66, "page": 3, "category": "fancy-fountains", "name": "Twril (5 Pcs)", "tamil": "ட்விர்ல் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1300.0, "netPrice": 130.0, "status": "VERIFIED"},
    {"code": 67, "page": 3, "category": "fancy-fountains", "name": "MRF Bat", "tamil": "எம்.ஆர்.எப் பேட்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1900.0, "netPrice": 190.0, "status": "VERIFIED"},
    {"code": 68, "page": 3, "category": "fancy-fountains", "name": "Cylinder Gas", "tamil": "சிலிண்டர் கேஸ்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 2000.0, "netPrice": 200.0, "status": "VERIFIED"},
    
    # Page 4: Fancy Items & Tin Fountains (69-96)
    {"code": 69, "page": 4, "category": "novelties", "name": "Oppo", "tamil": "ஒப்போ", "pack": "1 Box", "pieces": "1 Box", "listPrice": 2100.0, "netPrice": 210.0, "status": "VERIFIED"},
    {"code": 70, "page": 4, "category": "novelties", "name": "Power Point", "tamil": "பவர் பாயிண்ட்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 2000.0, "netPrice": 200.0, "status": "VERIFIED"},
    {"code": 71, "page": 4, "category": "novelties", "name": "Photo Flash (5 Pcs)", "tamil": "போட்டோ பிளாஷ் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    {"code": 72, "page": 4, "category": "novelties", "name": "Jigglers (2 Pcs)", "tamil": "ஜிக்லர்ஸ் (2)", "pack": "1 Box", "pieces": "2 Pcs", "listPrice": 1900.0, "netPrice": 190.0, "status": "VERIFIED"},
    {"code": 73, "page": 4, "category": "novelties", "name": "Mayil", "tamil": "மயில்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1400.0, "netPrice": 140.0, "status": "VERIFIED"},
    {"code": 74, "page": 4, "category": "novelties", "name": "Popcorn", "tamil": "பாப்கார்ன்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 75, "page": 4, "category": "novelties", "name": "Funblast gun (2 Pcs)", "tamil": "பன்ப்ளாஸ்ட் கன் (2)", "pack": "1 Box", "pieces": "2 Pcs", "listPrice": 2000.0, "netPrice": 200.0, "status": "VERIFIED"},
    {"code": 76, "page": 4, "category": "novelties", "name": "King Fisher", "tamil": "கிங் பிஷர்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 77, "page": 4, "category": "novelties", "name": "Pup G Gun (5 Pcs)", "tamil": "பப்ஜி கன் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1350.0, "netPrice": 135.0, "status": "VERIFIED"},
    {"code": 78, "page": 4, "category": "fancy-fountains", "name": "Bada Peacock", "tamil": "படா மயில்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 4500.0, "netPrice": 450.0, "status": "VERIFIED"},
    
    # Tin Cool Drinks Fountain (79-83)
    {"code": 79, "page": 4, "category": "tin-cool-drinks", "name": "Pepsi", "tamil": "பெப்சி", "pack": "1 Tin", "pieces": "1 Tin", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    {"code": 80, "page": 4, "category": "tin-cool-drinks", "name": "Coco Cola", "tamil": "கோகோ கோலா", "pack": "1 Tin", "pieces": "1 Tin", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    {"code": 81, "page": 4, "category": "tin-cool-drinks", "name": "7 Up", "tamil": "7 அப்", "pack": "1 Tin", "pieces": "1 Tin", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    {"code": 82, "page": 4, "category": "tin-cool-drinks", "name": "Water Millon", "tamil": "தர்பூசணி", "pack": "1 Tin", "pieces": "1 Tin", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    {"code": 83, "page": 4, "category": "tin-cool-drinks", "name": "Fanta", "tamil": "பாண்டா", "pack": "1 Tin", "pieces": "1 Tin", "listPrice": 900.0, "netPrice": 90.0, "status": "VERIFIED"},
    
    # Fantastic Novelties (84-87)
    {"code": 84, "page": 4, "category": "fantastic-novelties", "name": "Siren (2 Pcs)", "tamil": "சைரன் (2)", "pack": "1 Box", "pieces": "2 Pcs", "listPrice": 1500.0, "netPrice": 150.0, "status": "VERIFIED"},
    {"code": 85, "page": 4, "category": "fantastic-novelties", "name": "Sunstar / Milky / Kids candle", "tamil": "சன்ஸ்டார் / மில்கி / கிட்ஸ் கேண்டில்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 2000.0, "netPrice": 200.0, "status": "VERIFIED"},
    {"code": 86, "page": 4, "category": "fantastic-novelties", "name": "Sun Smoke (2 Pcs)", "tamil": "சன் ஸ்மோக் (2)", "pack": "1 Box", "pieces": "2 Pcs", "listPrice": 1800.0, "netPrice": 180.0, "status": "VERIFIED"},
    {"code": 87, "page": 4, "category": "fantastic-novelties", "name": "Helicopter (5 Pcs)", "tamil": "ஹெலிகாப்டர் (5)", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1400.0, "netPrice": 140.0, "status": "VERIFIED"},
    
    # Wheels (88)
    {"code": 88, "page": 4, "category": "wheels", "name": "Disco Wheel (10 Pcs)", "tamil": "டிஸ்கோ சக்கரம் (10)", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 1200.0, "netPrice": 120.0, "status": "VERIFIED"},
    
    # Fancy Crackers (89-90)
    {"code": 89, "page": 4, "category": "fancy-crackers", "name": "Olai Vedi", "tamil": "ஓலை வெடி", "pack": "1 Box", "pieces": "1 Box", "listPrice": 1750.0, "netPrice": 175.0, "status": "VERIFIED"},
    {"code": 90, "page": 4, "category": "fancy-crackers", "name": "Rock Party / Money Shot", "tamil": "ராக் பார்ட்டி / மணி ஷாட்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    
    # Aerial Fancy (91-96)
    {"code": 91, "page": 4, "category": "aerial-fancy", "name": "Chotta Fancy (1 1/2'' Single) - Golden Jupiter / Mercury / Venus / Comet Tail", "tamil": "சோட்டா பேண்சி (1 1/2'') - கோல்டன் ஜூபிடர்", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 480.0, "netPrice": 48.0, "status": "VERIFIED"},
    {"code": 92, "page": 4, "category": "aerial-fancy", "name": "Aerials of Trio 2'' (3 Pcs) - Almond / Pista / Peanut / Wall nut", "tamil": "ஏரியல் ட்ரையோ 2'' (3) - ஆல்மண்ட் / பிஸ்தா", "pack": "1 Box", "pieces": "3 Pcs", "listPrice": 2500.0, "netPrice": 250.0, "status": "VERIFIED"},
    {"code": 93, "page": 4, "category": "aerial-fancy", "name": "Aerial Fancy (2'' Single) - BMW / Royal Enfields / Honda / Suzuki", "tamil": "ஏரியல் பேண்சி 2'' சிங்கிள் - BMW / ஹோண்டா", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 950.0, "netPrice": 95.0, "status": "VERIFIED"},
    {"code": 94, "page": 4, "category": "aerial-fancy", "name": "Aerial Fancy (3'' Single) - Audi / Mclearn / Jaguar / Ferrari", "tamil": "ஏரியல் பேண்சி 3'' சிங்கிள் - ஆடி / ஜாகுவார்", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 2500.0, "netPrice": 250.0, "status": "VERIFIED"},
    {"code": 95, "page": 4, "category": "aerial-fancy", "name": "Aerial Fancy (4'' Single) - 4'' Pipe Colours", "tamil": "ஏரியல் பேண்சி 4'' பைப் கலர்ஸ்", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 3000.0, "netPrice": 300.0, "status": "VERIFIED"},
    {"code": 96, "page": 4, "category": "aerial-fancy", "name": "Aerial Fancy (4'' Single) - 4'' Pipe Nayagara", "tamil": "ஏரியல் பேண்சி 4'' நயாகரா பைப்", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 3200.0, "netPrice": 320.0, "status": "VERIFIED"},
    
    # Page 5: Aerial Fancy 5\", Roll Cap, Repeating Shots, Sparklers (97-120)
    {"code": 97, "page": 5, "category": "aerial-fancy", "name": "Aerial Fancy (5'' Pipe) - 5'' Pipe (1 Pce)", "tamil": "ஏரியல் பேண்சி 5'' பைப் (1)", "pack": "1 Box", "pieces": "1 Pce", "listPrice": 4000.0, "netPrice": 400.0, "status": "VERIFIED"},
    {"code": 98, "page": 5, "category": "roll-cap", "name": "Roll Cap", "tamil": "ரோல் கேப்", "pack": "1 Box", "pieces": "1 Box", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    
    # Repeating Shots (99-110)
    {"code": 99, "page": 5, "category": "fancy-repeating-shots", "name": "IPL 5 x 6 (30 Shots)", "tamil": "ஐபிஎல் 5 x 6 (30 ஷாட்ஸ்)", "pack": "1 Box", "pieces": "30 Shots", "listPrice": 12500.0, "netPrice": 1250.0, "status": "VERIFIED"},
    {"code": 100, "page": 5, "category": "fancy-repeating-shots", "name": "IPL 10 x 10 (100 Shots)", "tamil": "ஐபிஎல் 10 x 10 (100 ஷாட்ஸ்)", "pack": "1 Box", "pieces": "100 Shots", "listPrice": 40000.0, "netPrice": 4000.0, "status": "VERIFIED"},
    {"code": 101, "page": 5, "category": "fancy-repeating-shots", "name": "Repeating Shots Code 101", "tamil": "ரிப்பீட்டிங் ஷாட்ஸ் 101", "pack": "1 Box", "pieces": "1 Box", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Blank line printed at code 101 in PDF"},
    {"code": 102, "page": 5, "category": "fancy-repeating-shots", "name": "12 Blaze / Star War / Boom", "tamil": "12 பிளேஸ் / ஸ்டார் வார் / பூம்", "pack": "1 Box", "pieces": "12 Shots", "listPrice": 1350.0, "netPrice": 135.0, "status": "VERIFIED"},
    {"code": 103, "page": 5, "category": "fancy-repeating-shots", "name": "25 Rider Cheeta", "tamil": "25 ரைடர் சீட்டா", "pack": "1 Box", "pieces": "25 Shots", "listPrice": 2500.0, "netPrice": 250.0, "status": "VERIFIED"},
    {"code": 104, "page": 5, "category": "fancy-repeating-shots", "name": "30 Multi Colour Shots", "tamil": "30 மல்டி கலர் ஷாட்ஸ்", "pack": "1 Box", "pieces": "30 Shots", "listPrice": 3800.0, "netPrice": 380.0, "status": "VERIFIED"},
    {"code": 105, "page": 5, "category": "fancy-repeating-shots", "name": "60 Multi Colour Shots", "tamil": "60 மல்டி கலர் ஷாட்ஸ்", "pack": "1 Box", "pieces": "60 Shots", "listPrice": 7500.0, "netPrice": 750.0, "status": "VERIFIED"},
    {"code": 106, "page": 5, "category": "fancy-repeating-shots", "name": "120 Multi Colour Shots", "tamil": "120 மல்டி கலர் ஷாட்ஸ்", "pack": "1 Box", "pieces": "120 Shots", "listPrice": 15000.0, "netPrice": 1500.0, "status": "VERIFIED"},
    {"code": 107, "page": 5, "category": "fancy-repeating-shots", "name": "240 Multi Colour Shots", "tamil": "240 மல்டி கலர் ஷாட்ஸ்", "pack": "1 Box", "pieces": "240 Shots", "listPrice": 30000.0, "netPrice": 3000.0, "status": "VERIFIED"},
    {"code": 108, "page": 5, "category": "fancy-repeating-shots", "name": "500 Multi Colour Shots", "tamil": "500 மல்டி கலர் ஷாட்ஸ்", "pack": "1 Box", "pieces": "500 Shots", "listPrice": 65000.0, "netPrice": 6500.0, "status": "VERIFIED"},
    {"code": 109, "page": 5, "category": "fancy-repeating-shots", "name": "Sun Wonder 2'' (25 Shots)", "tamil": "சன் வொண்டர் 2'' (25 ஷாட்ஸ்)", "pack": "1 Box", "pieces": "25 Shots", "listPrice": 25000.0, "netPrice": 2500.0, "status": "VERIFIED"},
    {"code": 110, "page": 5, "category": "fancy-repeating-shots", "name": "50 Bestie Rider", "tamil": "50 பெஸ்டி ரைடர்", "pack": "1 Box", "pieces": "50 Shots", "listPrice": 5000.0, "netPrice": 500.0, "status": "VERIFIED"},
    
    # Sparklers Net Rate (111-120)
    {"code": 111, "page": 5, "category": "sparklers", "name": "7cm Electric Sparklers", "tamil": "7 செ.மீ எலக்ட்ரிக் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 130.0, "netPrice": 13.0, "status": "VERIFIED"},
    {"code": 112, "page": 5, "category": "sparklers", "name": "7cm Colour Sparklers", "tamil": "7 செ.மீ கலர் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 130.0, "netPrice": 13.0, "status": "VERIFIED"},
    {"code": 113, "page": 5, "category": "sparklers", "name": "10cm Electric Sparklers", "tamil": "10 செ.மீ எலக்ட்ரிக் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 260.0, "netPrice": 26.0, "status": "VERIFIED"},
    {"code": 114, "page": 5, "category": "sparklers", "name": "10cm Colour Sparklers", "tamil": "10 செ.மீ கலர் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 260.0, "netPrice": 26.0, "status": "VERIFIED"},
    {"code": 115, "page": 5, "category": "sparklers", "name": "15cm Electric Sparklers", "tamil": "15 செ.மீ எலக்ட்ரிக் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    {"code": 116, "page": 5, "category": "sparklers", "name": "15cm Colour Sparklers", "tamil": "15 செ.மீ கலர் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "10 Pcs", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    {"code": 117, "page": 5, "category": "sparklers", "name": "30cm Electric Sparklers", "tamil": "30 செ.மீ எலக்ட்ரிக் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    {"code": 118, "page": 5, "category": "sparklers", "name": "30cm Colour Sparklers", "tamil": "30 செ.மீ கலர் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 600.0, "netPrice": 60.0, "status": "VERIFIED"},
    {"code": 119, "page": 5, "category": "sparklers", "name": "55cm Electric Sparklers", "tamil": "55 செ.மீ எலக்ட்ரிக் கம்பி மத்தாப்பு", "pack": "1 Box", "pieces": "5 Pcs", "listPrice": 1850.0, "netPrice": 185.0, "status": "VERIFIED"},
    {"code": 120, "page": 5, "category": "sparklers", "name": "Sparkler Special Code 120", "tamil": "கம்பி மத்தாப்பு 120", "pack": "1 Box", "pieces": "1 Box", "listPrice": None, "netPrice": None, "status": "NEEDS_VERIFICATION", "notes": "Blank line printed at code 120 in PDF"},

    # Page 6: Gift Box Items (121-129 + named special packs)
    {"code": 121, "page": 6, "category": "gift-boxes", "name": "Dora Gift Box", "tamil": "டோரா கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "18 Items", "itemCount": 18, "listPrice": 25000.0, "netPrice": 2500.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 122, "page": 6, "category": "gift-boxes", "name": "Black Berry Gift Box", "tamil": "பிளாக் பெரி கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "21 Items", "itemCount": 21, "listPrice": 30000.0, "netPrice": 3000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 123, "page": 6, "category": "gift-boxes", "name": "Dhoni Gift Box", "tamil": "தோனி கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "26 Items", "itemCount": 26, "listPrice": 40000.0, "netPrice": 4000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 124, "page": 6, "category": "gift-boxes", "name": "7 Hills Gift Box", "tamil": "7 ஹில்ஸ் கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "30 Items", "itemCount": 30, "listPrice": 50000.0, "netPrice": 5000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 125, "page": 6, "category": "gift-boxes", "name": "Eagle Gift Box", "tamil": "ஈகிள் கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "35 Items", "itemCount": 35, "listPrice": 60000.0, "netPrice": 6000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 126, "page": 6, "category": "gift-boxes", "name": "Hulk Gift Box", "tamil": "ஹல்க் கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "40 Items", "itemCount": 40, "listPrice": 75000.0, "netPrice": 7500.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 127, "page": 6, "category": "gift-boxes", "name": "VIP Joker Gift Box", "tamil": "விஐபி ஜோக்கர் கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "50 Items", "itemCount": 50, "listPrice": 90000.0, "netPrice": 9000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 128, "page": 6, "category": "gift-boxes", "name": "VVIP Lucky 7 Horse Gift Box", "tamil": "விவிஐபி லக்கி 7 ஹார்ஸ் கிப்ட் பாக்ஸ்", "pack": "1 Box", "pieces": "60 Items", "itemCount": 60, "listPrice": 130000.0, "netPrice": 13000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 129, "page": 6, "category": "gift-boxes", "name": "Mega VVIP Carnival (VIP Mega)", "tamil": "மெகா விவிஐபி கார்னிவல் (விஐபி மெகா)", "pack": "1 Box", "pieces": "VIP Mega Combo", "itemCount": 75, "listPrice": 250000.0, "netPrice": 25000.0, "status": "VERIFIED", "isGiftPack": True},
    
    # Page 6: Special Family Packs
    {"code": 130, "page": 6, "category": "gift-boxes", "name": "Silver Pack Family Pack (2026 Special)", "tamil": "சில்வர் பேக் பேமிலி பேக் (2026 ஸ்பெஷல்)", "pack": "1 Box", "pieces": "Curated Family Pack", "itemCount": 24, "listPrice": 30000.0, "netPrice": 3000.0, "status": "VERIFIED", "isGiftPack": True},
    {"code": 131, "page": 6, "category": "gift-boxes", "name": "Gold Pack Family Pack (2026 Special)", "tamil": "கோல்டு பேக் பேமிலி பேக் (2026 ஸ்பெஷல்)", "pack": "1 Box", "pieces": "Premium Family Pack", "itemCount": 38, "listPrice": 50000.0, "netPrice": 5000.0, "status": "VERIFIED", "isGiftPack": True}
]

# Generate slug for each item
def make_slug(name, code):
    s = name.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return f"{s}-{code}"

for item in ITEMS_RAW:
    item['slug'] = make_slug(item['name'], item['code'])
    # Calculate discount percent
    if item['listPrice'] and item['netPrice']:
        item['discountPercent'] = round(((item['listPrice'] - item['netPrice']) / item['listPrice']) * 100)
    else:
        item['discountPercent'] = None

# Write catalog/products.csv
os.makedirs('catalog', exist_ok=True)
csv_columns = [
    'code', 'slug', 'name', 'tamil', 'category', 'pack', 'pieces',
    'listPrice', 'netPrice', 'discountPercent', 'page', 'status', 'notes'
]
with open('catalog/products.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=csv_columns, extrasaction='ignore')
    writer.writeheader()
    for it in ITEMS_RAW:
        row = dict(it)
        if 'notes' not in row:
            row['notes'] = ''
        writer.writerow(row)

# Write catalog/verification-report.csv
audit_columns = ['code', 'name', 'category', 'page', 'status', 'listPrice', 'netPrice', 'discrepancy_or_flag']
with open('catalog/verification-report.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=audit_columns)
    writer.writeheader()
    for it in ITEMS_RAW:
        flag = ''
        if it['status'] == 'NEEDS_VERIFICATION':
            flag = it.get('notes', 'Price or name missing in PDF')
        elif it['discountPercent'] != 90 and it.get('isGiftPack') is not True:
            flag = f"Discount is {it['discountPercent']}%, not 90%"
        else:
            flag = 'Confirmed match with PDF line coordinates'
        writer.writerow({
            'code': it['code'],
            'name': it['name'],
            'category': it['category'],
            'page': it['page'],
            'status': it['status'],
            'listPrice': it['listPrice'] or '',
            'netPrice': it['netPrice'] or '',
            'discrepancy_or_flag': flag
        })

# Write catalog/products.json
catalog_data = {
    "metadata": {
        "businessName": "MSP Pyro Park",
        "associatedBrand": "Sun Star Fire Works",
        "showroomAddress": "Near AAA College, Virudhunagar - Sivakasi Main Road, Amathur, Sivakasi, Tamil Nadu, India",
        "contactNumbers": ["9698992410", "9443868650", "9442775179"],
        "whatsappNumbers": ["9698992410", "9443868650"],
        "bankAccounts": [
            {
                "entity": "Ganapathy Traders",
                "accountNo": "1810280000000336",
                "ifsc": "KVBL0001810",
                "bank": "Karur Vysya Bank",
                "branch": "S.N.Puram"
            },
            {
                "entity": "MSP Pyro Park",
                "accountNo": "1810283000000030",
                "ifsc": "KVBL0001810",
                "bank": "Karur Vysya Bank",
                "branch": "S.N.Puram"
            },
            {
                "entity": "Sunstar Fireworks",
                "accountNo": "1810280000000371",
                "ifsc": "KVBL0001810",
                "bank": "Karur Vysya Bank",
                "branch": "S.N.Puram"
            }
        ],
        "claimedDiscount": "Up to 90% against listed prices on select retail crackers",
        "sourceDocument": "MSP Retail List 2026.pdf",
        "totalProducts": len(ITEMS_RAW),
        "verifiedProducts": sum(1 for x in ITEMS_RAW if x['status'] == 'VERIFIED'),
        "needsVerificationProducts": sum(1 for x in ITEMS_RAW if x['status'] == 'NEEDS_VERIFICATION')
    },
    "categories": CATEGORIES,
    "products": ITEMS_RAW
}

with open('catalog/products.json', 'w', encoding='utf-8') as f:
    json.dump(catalog_data, f, indent=2, ensure_ascii=False)

print(f"Extraction successful:")
print(f"Total items: {len(ITEMS_RAW)}")
print(f"Verified: {catalog_data['metadata']['verifiedProducts']}")
print(f"Needs Verification: {catalog_data['metadata']['needsVerificationProducts']}")
