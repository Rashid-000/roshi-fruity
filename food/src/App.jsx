"use client"

import { useState, useRef } from "react"
import { Heart, Star, Clock, Users, Mail, Phone, MapPin, Menu, X } from "lucide-react"

// Import images from assets folder
import Apple from "./assets/Apple.jpg"
import Banana from "./assets/Banana.jpg"
import orange from "./assets/orange.jpg"
import fruite2 from "./assets/fruite2.jpg"

// Mock data for fruits with local images
const fruitsData = [
  {
    id: 1,
    name: "Apple",
    image: Apple,
    description: "Crisp and sweet, perfect for daily nutrition",
    category: "Pome Fruit",
    season: "Fall",
    calories: 95,
    vitamin: "Vitamin C",
    types: ["Red Delicious", "Gala", "Fuji", "Granny Smith", "Honeycrisp", "Golden Delicious"],
    benefits: ["Rich in fiber", "Antioxidants", "Heart healthy", "Weight management"],
    usefulForDiseases: [
      "Heart Disease - Reduces cholesterol levels",
      "Diabetes - Helps regulate blood sugar",
      "Digestive Issues - High fiber content aids digestion",
      "Cancer Prevention - Antioxidants fight free radicals",
      "Alzheimer's - Quercetin protects brain cells",
      "Asthma - Anti-inflammatory properties",
    ],
    notRecommendedFor: [
      "IBS (Irritable Bowel Syndrome) - High FODMAP content may trigger symptoms",
      "Severe Acid Reflux - Natural acids may worsen symptoms",
      "Apple Allergy - Can cause oral allergy syndrome",
    ],
    origin: "Central Asia",
    varieties: ["Gala", "Fuji", "Granny Smith", "Red Delicious"],
    nutritionFacts: {
      carbs: "25g",
      fiber: "4g",
      sugar: "19g",
      protein: "0.5g",
    },
  },
  {
    id: 2,
    name: "Banana",
    image: Banana,
    description: "Energy-packed tropical fruit rich in potassium",
    category: "Tropical Fruit",
    season: "Year-round",
    calories: 105,
    vitamin: "Vitamin B6",
    types: ["Cavendish", "Plantain", "Red Banana", "Lady Finger", "Blue Java", "Burro"],
    benefits: ["High potassium", "Energy boost", "Digestive health", "Mood enhancement"],
    usefulForDiseases: [
      "High Blood Pressure - Potassium helps regulate blood pressure",
      "Depression - Tryptophan converts to serotonin",
      "Muscle Cramps - Potassium prevents cramping",
      "Kidney Stones - Potassium citrate prevents stone formation",
      "Diarrhea - Helps restore electrolyte balance",
      "Anemia - Vitamin B6 aids hemoglobin production",
    ],
    notRecommendedFor: [
      "Kidney Disease - High potassium may be dangerous",
      "Diabetes (ripe bananas) - High sugar content",
      "Migraine Sufferers - Tyramine content may trigger headaches",
      "Latex Allergy - Cross-reactivity possible",
    ],
    origin: "Southeast Asia",
    varieties: ["Cavendish", "Plantain", "Red Banana", "Lady Finger"],
    nutritionFacts: {
      carbs: "27g",
      fiber: "3g",
      sugar: "14g",
      protein: "1g",
    },
  },
  {
    id: 3,
    name: "Orange",
    image: orange,
    description: "Juicy citrus fruit bursting with vitamin C",
    category: "Citrus Fruit",
    season: "Winter",
    calories: 62,
    vitamin: "Vitamin C",
    types: ["Navel", "Valencia", "Blood Orange", "Mandarin", "Tangerine", "Clementine"],
    benefits: ["Immune support", "Skin health", "Iron absorption", "Antioxidants"],
    usefulForDiseases: [
      "Scurvy - High vitamin C content prevents deficiency",
      "Common Cold - Boosts immune system",
      "Iron Deficiency - Vitamin C enhances iron absorption",
      "High Cholesterol - Pectin helps lower cholesterol",
      "Kidney Stones - Citrate prevents stone formation",
      "Cancer Prevention - Flavonoids have anti-cancer properties",
    ],
    notRecommendedFor: [
      "GERD (Acid Reflux) - Citric acid may worsen symptoms",
      "Kidney Disease - High potassium content",
      "Citrus Allergy - Can cause allergic reactions",
      "Medication Interactions - May affect certain drug absorption",
    ],
    origin: "China",
    varieties: ["Navel", "Valencia", "Blood Orange", "Mandarin"],
    nutritionFacts: {
      carbs: "15g",
      fiber: "3g",
      sugar: "12g",
      protein: "1g",
    },
  },
]

export default function FruitBlogWebsite() {
  const [activeSection, setActiveSection] = useState("home")
  const [expandedFruit, setExpandedFruit] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFruitsForComparison, setSelectedFruitsForComparison] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  // Refs for smooth scrolling
  const featuredFruitsRef = useRef(null)

  const filteredFruits = fruitsData.filter((fruit) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      fruit.name.toLowerCase().includes(searchLower) ||
      fruit.category.toLowerCase().includes(searchLower) ||
      fruit.description.toLowerCase().includes(searchLower) ||
      fruit.benefits.some((benefit) => benefit.toLowerCase().includes(searchLower)) ||
      fruit.types.some((type) => type.toLowerCase().includes(searchLower)) ||
      fruit.usefulForDiseases.some((disease) => disease.toLowerCase().includes(searchLower))
    )
  })

  const toggleFruitDetails = (fruitId) => {
    setExpandedFruit(expandedFruit === fruitId ? null : fruitId)
  }

  const addToComparison = (fruitId) => {
    if (selectedFruitsForComparison.includes(fruitId)) {
      setSelectedFruitsForComparison(selectedFruitsForComparison.filter((id) => id !== fruitId))
    } else if (selectedFruitsForComparison.length < 3) {
      setSelectedFruitsForComparison([...selectedFruitsForComparison, fruitId])
    }
  }

  const clearComparison = () => {
    setSelectedFruitsForComparison([])
    setShowComparison(false)
  }

  const getSelectedFruits = () => {
    return fruitsData.filter((fruit) => selectedFruitsForComparison.includes(fruit.id))
  }

  // Function to scroll to featured fruits section
  const scrollToFeaturedFruits = () => {
    featuredFruitsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  // Function to navigate to about section
  const goToAbout = () => {
    setActiveSection("about")
  }

  const renderHeader = () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">🍎</span>
          </div>
          <span className="text-xl font-bold">Fruity</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <button
            onClick={() => setActiveSection("home")}
            className={`nav-button ${activeSection === "home" ? "nav-button-active" : ""}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveSection("about")}
            className={`nav-button ${activeSection === "about" ? "nav-button-active" : ""}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveSection("contact")}
            className={`nav-button ${activeSection === "contact" ? "nav-button-active" : ""}`}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveSection("compare")}
            className={`nav-button ${activeSection === "compare" ? "nav-button-active" : ""}`}
          >
            Compare
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <nav className="mobile-nav-content">
            <button
              onClick={() => {
                setActiveSection("home")
                setMobileMenuOpen(false)
              }}
              className={`mobile-nav-button ${activeSection === "home" ? "mobile-nav-button-active" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveSection("about")
                setMobileMenuOpen(false)
              }}
              className={`mobile-nav-button ${activeSection === "about" ? "mobile-nav-button-active" : ""}`}
            >
              About
            </button>
            <button
              onClick={() => {
                setActiveSection("contact")
                setMobileMenuOpen(false)
              }}
              className={`mobile-nav-button ${activeSection === "contact" ? "mobile-nav-button-active" : ""}`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                setActiveSection("compare")
                setMobileMenuOpen(false)
              }}
              className={`mobile-nav-button ${activeSection === "compare" ? "mobile-nav-button-active" : ""}`}
            >
              Compare
            </button>
          </nav>
        </div>
      )}
    </header>
  )

  const renderHome = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-12 text-white md:py-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Discover the World of Fruits</h1>
          <p className="mb-8 text-lg md:text-xl opacity-90">
            Explore nutritious and delicious fruits from around the globe. Learn about their benefits, origins, and
            varieties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary btn-lg" onClick={scrollToFeaturedFruits}>
              Explore Fruits
            </button>
            <button
              className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              onClick={goToAbout}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="mx-auto max-w-2xl">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-2">Find Your Perfect Fruit</h2>
          <p className="text-sm text-muted-foreground">
            Search by name, category, health benefits, or medical conditions
          </p>
        </div>
        <input
          type="text"
          placeholder="Search fruits, health benefits, or medical conditions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full text-center"
        />
        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Found {filteredFruits.length} fruit{filteredFruits.length !== 1 ? "s" : ""} matching "{searchTerm}"
          </p>
        )}
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">50+</div>
          <div className="text-sm text-muted-foreground">Fruit Varieties</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">1M+</div>
          <div className="text-sm text-muted-foreground">Happy Readers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">100%</div>
          <div className="text-sm text-muted-foreground">Natural</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">24/7</div>
          <div className="text-sm text-muted-foreground">Fresh Content</div>
        </div>
      </section>

      {/* Fruits Grid */}
      <section ref={featuredFruitsRef}>
        <h2 className="mb-6 text-2xl font-bold">Featured Fruits</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFruits.map((fruit) => (
            <div key={fruit.id} className="card overflow-hidden transition-all hover:shadow-lg">
              <div className="relative">
                <img
                  src={fruit.image || "/placeholder.svg"}
                  alt={fruit.name}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=300&width=400&text=" + fruit.name
                  }}
                />
                <span className="badge badge-default absolute top-2 right-2 bg-white/90 text-black">
                  {fruit.category}
                </span>
              </div>

              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h3 className="card-title text-xl">{fruit.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <p className="card-description">{fruit.description}</p>
              </div>

              <div className="card-content">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{fruit.season}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{fruit.calories} cal</span>
                  </div>
                </div>

                {expandedFruit === fruit.id && (
                  <div className="space-y-4 border-t pt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Types & Varieties</h4>
                      <div className="flex flex-wrap gap-1">
                        {fruit.types.map((type, index) => (
                          <span key={index} className="badge badge-outline text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Health Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {fruit.benefits.map((benefit, index) => (
                          <span key={index} className="badge badge-secondary text-xs">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">✅ Useful for These Conditions</h4>
                      <div className="space-y-1">
                        {fruit.usefulForDiseases.map((disease, index) => (
                          <div key={index} className="text-xs bg-green-50 p-2 rounded border-l-2 border-green-500">
                            {disease}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">⚠️ Not Recommended For</h4>
                      <div className="space-y-1">
                        {fruit.notRecommendedFor.map((condition, index) => (
                          <div key={index} className="text-xs bg-red-50 p-2 rounded border-l-2 border-red-500">
                            {condition}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Nutrition Facts (per 100g)</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Carbs: {fruit.nutritionFacts.carbs}</div>
                        <div>Fiber: {fruit.nutritionFacts.fiber}</div>
                        <div>Sugar: {fruit.nutritionFacts.sugar}</div>
                        <div>Protein: {fruit.nutritionFacts.protein}</div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <strong>Origin:</strong> {fruit.origin}
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer">
                <button
                  onClick={() => toggleFruitDetails(fruit.id)}
                  className={`btn w-full ${expandedFruit === fruit.id ? "btn-secondary" : "btn-default"}`}
                >
                  {expandedFruit === fruit.id ? "Hide Details" : "Show Properties"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderAbout = () => (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">About Fruity</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Your ultimate destination for discovering the wonderful world of fruits and their incredible health benefits.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={fruite2 || "/placeholder.svg"}
            alt="Colorful fruits"
            className="rounded-lg object-cover w-full h-96"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=400&width=600&text=Colorful+Fruits"
            }}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe that knowledge about nutrition should be accessible to everyone. Our mission is to provide
            comprehensive, accurate, and engaging information about fruits from around the world.
          </p>
          <p className="text-muted-foreground">
            From exotic tropical fruits to common everyday varieties, we cover everything you need to know about their
            nutritional benefits, origins, varieties, and how they can contribute to a healthy lifestyle.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Expert Team</span>
            </h3>
          </div>
          <div className="card-content">
            <p className="text-sm text-muted-foreground">
              Our team consists of nutritionists, food scientists, and health enthusiasts dedicated to bringing you
              accurate information.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span>Quality Content</span>
            </h3>
          </div>
          <div className="card-content">
            <p className="text-sm text-muted-foreground">
              Every article is thoroughly researched and fact-checked to ensure you receive the most reliable
              information.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Health Focus</span>
            </h3>
          </div>
          <div className="card-content">
            <p className="text-sm text-muted-foreground">
              We focus on the health benefits and nutritional value of fruits to help you make informed dietary choices.
            </p>
          </div>
        </div>
      </section>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Have questions about fruits or want to contribute to our blog? We'd love to hear from you!
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Get in Touch</h3>
              <p className="card-description">Send us a message and we'll get back to you as soon as possible.</p>
            </div>
            <div className="card-content space-y-4">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-1">
                    Name *
                  </label>
                  <input id="name" name="name" placeholder="Your name" required className="input" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-1">
                    Email *
                  </label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" required className="input" />
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium block mb-1">
                    Subject *
                  </label>
                  <input id="subject" name="subject" placeholder="What's this about?" required className="input" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={4}
                    required
                    className="textarea"
                  />
                </div>
                <button type="submit" className="btn btn-default w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Contact Information</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">rashidkhanborana@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">+923418156514</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-sm text-muted-foreground">
                    Bahwalpur,punjab pakistan
                    <br />
                    One unit chok street No:1
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Office Hours</h3>
            </div>
            <div className="card-content">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderCompare = () => (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Compare Fruits</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Select up to 3 fruits to compare their nutritional values, health benefits, and medical properties side by
          side.
        </p>
      </section>

      {/* Fruit Selection */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Select Fruits to Compare</h2>
          <div className="flex items-center space-x-4">
            {selectedFruitsForComparison.length > 0 && (
              <>
                <span className="text-sm text-gray-600">{selectedFruitsForComparison.length}/3 selected</span>
                <button className="btn btn-outline btn-sm" onClick={clearComparison}>
                  Clear All
                </button>
                {selectedFruitsForComparison.length >= 2 && (
                  <button className="btn btn-default" onClick={() => setShowComparison(true)}>
                    Compare Selected
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fruitsData.map((fruit) => (
            <div
              key={fruit.id}
              className={`card cursor-pointer transition-all hover:shadow-lg ${
                selectedFruitsForComparison.includes(fruit.id) ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => addToComparison(fruit.id)}
            >
              <div className="relative">
                <img
                  src={fruit.image || "/placeholder.svg"}
                  alt={fruit.name}
                  className="h-32 w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=200&width=400&text=" + fruit.name
                  }}
                />
                {selectedFruitsForComparison.includes(fruit.id) && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                )}
                <span className="badge badge-default absolute top-2 left-2 bg-white/90 text-black">
                  {fruit.category}
                </span>
              </div>
              <div className="card-header pb-2">
                <h3 className="card-title text-lg">{fruit.name}</h3>
                <p className="card-description text-sm">{fruit.description}</p>
              </div>
              <div className="card-content pt-0">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{fruit.season}</span>
                  <span>{fruit.calories} cal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Results */}
      {showComparison && selectedFruitsForComparison.length >= 2 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Comparison Results</h2>
            <button className="btn btn-outline" onClick={() => setShowComparison(false)}>
              Hide Comparison
            </button>
          </div>

          {/* Basic Information Comparison */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Basic Information</h3>
            </div>
            <div className="card-content">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Property</th>
                      {getSelectedFruits().map((fruit) => (
                        <th key={fruit.id} className="text-left p-2 font-medium">
                          {fruit.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Category</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.category}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Season</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.season}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Origin</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.origin}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Primary Vitamin</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.vitamin}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Nutritional Comparison */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Nutritional Facts (per 100g)</h3>
            </div>
            <div className="card-content">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Nutrient</th>
                      {getSelectedFruits().map((fruit) => (
                        <th key={fruit.id} className="text-left p-2 font-medium">
                          {fruit.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Calories</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2 font-semibold text-blue-600">
                          {fruit.calories}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Carbohydrates</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.nutritionFacts.carbs}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Fiber</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.nutritionFacts.fiber}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Sugar</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.nutritionFacts.sugar}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Protein</td>
                      {getSelectedFruits().map((fruit) => (
                        <td key={fruit.id} className="p-2">
                          {fruit.nutritionFacts.protein}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Health Benefits Comparison */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Health Benefits Comparison</h3>
            </div>
            <div className="card-content">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getSelectedFruits().map((fruit) => (
                  <div key={fruit.id} className="space-y-2">
                    <h4 className="font-semibold text-lg">{fruit.name}</h4>
                    <div className="space-y-1">
                      {fruit.benefits.map((benefit, index) => (
                        <span key={index} className="badge badge-secondary text-xs mr-1 mb-1">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medical Conditions Comparison */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Medical Conditions - Useful For</h3>
            </div>
            <div className="card-content">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {getSelectedFruits().map((fruit) => (
                  <div key={fruit.id} className="space-y-2">
                    <h4 className="font-semibold text-lg text-green-600">✅ {fruit.name}</h4>
                    <div className="space-y-1">
                      {fruit.usefulForDiseases.map((disease, index) => (
                        <div key={index} className="text-xs bg-green-50 p-2 rounded border-l-2 border-green-500">
                          {disease}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Comparison Cards */}
      {selectedFruitsForComparison.length > 0 && !showComparison && (
        <section>
          <h3 className="text-lg font-semibold mb-4">Selected for Comparison</h3>
          <div className="flex flex-wrap gap-4">
            {getSelectedFruits().map((fruit) => (
              <div key={fruit.id} className="card w-48">
                <div className="card-content p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{fruit.name}</span>
                    <button className="btn btn-ghost btn-sm h-6 w-6 p-0" onClick={() => addToComparison(fruit.id)}>
                      ×
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    {fruit.calories} cal • {fruit.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}

      <main className="container mx-auto px-4 py-8">
        {activeSection === "home" && renderHome()}
        {activeSection === "about" && renderAbout()}
        {activeSection === "contact" && renderContact()}
        {activeSection === "compare" && renderCompare()}
      </main>

      <footer className="border-t bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">🍎</span>
                </div>
                <span className="text-lg font-bold">FruitBlog</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted source for fruit knowledge and healthy living tips.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => setActiveSection("home")}
                  className="block text-muted-foreground hover:text-primary"
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveSection("about")}
                  className="block text-muted-foreground hover:text-primary"
                >
                  About
                </button>
                <button
                  onClick={() => setActiveSection("contact")}
                  className="block text-muted-foreground hover:text-primary"
                >
                  Contact
                </button>
                <button onClick={() => setActiveSection("compare")} className="block text-gray-600 hover:text-blue-600">
                  Compare
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Tropical Fruits</div>
                <div>Citrus Fruits</div>
                <div>Berries</div>
                <div>Stone Fruits</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-3">Subscribe for weekly fruit facts and recipes.</p>
              <div className="flex space-x-2">
                <input placeholder="Your email" className="input text-sm flex-1" />
                <button className="btn btn-default btn-sm">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="separator my-6"></div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div>© 2024 FruitBlog. All rights reserved.</div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
