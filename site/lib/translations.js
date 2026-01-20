// Language list for selector and first-time modal
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ur', name: 'اردو' },
];

// Language translations
export const translations = {
  en: {
    // First-time language modal
    firstTime: {
      title: "Choose your language",
      subtitle: "Select your preferred language to browse the website",
      continue: "Continue"
    },
    // Navigation
    nav: {
      home: "Home",
      products: "Products",
      clients: "Clients",
      about: "About Us",
      team: "Our Team",
      foreignCollaborations: "Foreign Collaborations",
      investor: "Investor Relations",
      careers: "Careers",
      contact: "Contact Us"
    },
    // Hero Section
    hero: {
      title: "YNM MEGA INDUSTRIES",
      since: "Since 2013 • Manufacturing & Export Excellence",
      tagline1: "Manufacturing Excellence, Global Reach",
      tagline2: "Road Marking Paints, Fabrications & Furniture",
      tagline3: "Trusted by Clients Across 15+ Countries",
      tagline4: "Quality Manufacturing Since 2013",
      exploreProducts: "Explore Products",
      yearsExperience: "Years Experience",
      projectsDelivered: "Projects Delivered",
      exportCountries: "Export Countries",
      happyClients: "Happy Clients"
    },
    // Common
    common: {
      learnMore: "Learn More",
      viewAll: "View All",
      contactUs: "Contact Us",
      getQuote: "Get Quote",
      readMore: "Read More",
      close: "Close",
      submit: "Submit",
      cancel: "Cancel",
      noBrands: "No brands available"
    },
    // Chatbot
    chatbot: {
      title: "YNM AI Assistant",
      subtitle: "Powered by Google Gemini",
      placeholder: "Type your question...",
      quickQuestions: "Quick questions:",
      newChat: "New Chat",
      exportChat: "Export Chat",
      copyMessage: "Copy",
      helpful: "Helpful",
      notHelpful: "Not Helpful",
      followUp: "Follow-up questions:",
      getQuote: "Get Quote",
      scheduleVisit: "Schedule Visit"
    },
    // Footer
    footer: {
      about: "About",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
      copyright: "All rights reserved",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      callNow: "Call Now",
      emailUs: "Email Us",
      yourSafetyPartner: "Your Safety Partner!",
      createdBy: "Created by",
      whatsAppComingSoon: "WhatsApp coming soon!",
      aboutText: "Leading manufacturer and exporter of premium paints, metal fabrications, and school furniture. Delivering quality products to global markets since 2013."
    },
    // Products Section
    products: {
      tag: "Our Products",
      title: "What We Manufacture",
      description: "Premium quality products manufactured in-house and exported to clients across 15+ countries worldwide",
      explore: "Explore",
      viewAll: "View All Products",
      paintsTitle: "Premium Paints",
      paintsDesc: "High-quality industrial and decorative paints for every surface. Durable, vibrant, and eco-friendly formulations.",
      fabricationTitle: "Metal Fabrication",
      fabricationDesc: "Custom steel and metal fabrication solutions. From structural components to precision-engineered parts.",
      furnitureTitle: "School Furniture",
      furnitureDesc: "Ergonomic and durable furniture for educational institutions. Desks, chairs, and complete classroom solutions.",
      safetyTitle: "Safety Equipment",
      safetyDesc: "Premium safety gear and equipment for industrial use. Helmets, gloves, protective wear and more."
    },
    // Services Section
    services: {
      tag: "What We Do",
      title: "Our Solutions",
      description: "Complete manufacturing, customization, and export solutions",
      learnMore: "Learn More"
    },
    // Mission Section
    mission: {
      title: "Our Mission & Vision",
      missionLabel: "Our Mission",
      visionLabel: "Our Vision"
    },
    // USP Section (About section)
    usp: {
      tag: "About Us",
      title: "About section",
      subtitle: "",
      benefits: [
        { title: "Advanced Manufacturing..", description: "YNM Mega Industries operates advanced manufacturing facilities delivering high-quality industrial paints, precision metal fabrication, and engineered school furniture. As a trusted global manufacturer, we combine modern machinery, skilled expertise, and efficient processes to serve worldwide industrial and infrastructure projects." },
        { title: "Quality Certified..", description: "At YNM Mega Industries, quality is our foundation. All our products including industrial paints, fabrication components, and school furniture are manufactured under ISO 9001:2015 certified quality systems, ensuring durability, safety, and consistent performance for global markets." },
        { title: "Global Export Network", description: "YNM Mega Industries is a reliable global exporter of industrial paints, metal fabrication products, safety solutions, and school furniture. We supply to clients across Asia, Africa, the Middle East, and international markets with efficient logistics, compliance, and timely delivery." },
        { title: "Custom Solutions", description: "We specialize in customized manufacturing solutions including bespoke paint formulations, custom metal fabrication, and made-to-order school furniture. YNM Mega Industries supports global clients with flexible production, technical expertise, and project-specific solutions." }
      ]
    },
    // Testimonials Section
    testimonials: {
      title: "Testimonials",
      subtitle: "What our clients say about YNM Mega Industries"
    },
    // Brands Section
    brands: {
      tag: "Our Partners",
      title: "Brands We Work With",
      description: "Trusted by leading companies and institutions across India and globally"
    },
    // Employees Section
    employees: {
      tag: "Our Team",
      title: "What Our Employees Say",
      subtitle: "Hear from our leadership team and key employees about our mission, values, and commitment to excellence",
      fallback: [
        { role: "Chief Executive Officer (CEO)", department: "Executive Leadership", text: "At YNM Mega Industries, we're committed to manufacturing excellence and global expansion. Our vision is to be the leading manufacturer and exporter, delivering quality products that exceed expectations across 15+ countries." },
        { role: "Director of Operations", department: "Operations", text: "Our state-of-the-art manufacturing facility ensures every product meets international quality standards. We take pride in our precision engineering and commitment to delivering on time, every time." },
        { role: "Head of Manufacturing", department: "Production", text: "Quality is at the heart of everything we manufacture. From paints to fabrications to furniture, we maintain strict quality control at every stage to ensure our products stand the test of time." },
        { role: "Export Director", department: "International Trade", text: "We've built strong relationships with partners across Asia, Africa, and the Middle East. Our export team ensures seamless logistics and documentation for hassle-free global delivery." },
        { role: "Head of Quality Assurance", department: "Quality Control", text: "ISO 9001:2015 certification reflects our commitment to quality. Every product undergoes rigorous testing and inspection before it reaches our clients, ensuring consistent excellence." },
        { role: "Director of Sales & Marketing", department: "Business Development", text: "Building trust with our clients is our priority. We work closely with partners to understand their needs and deliver customized solutions that drive their success." }
      ]
    }
  },
  hi: {
    firstTime: { title: "अपनी भाषा चुनें", subtitle: "वेबसाइट देखने के लिए अपनी पसंदीदा भाषा चुनें", continue: "जारी रखें" },
    nav: {
      home: "होम",
      products: "उत्पाद",
      clients: "ग्राहक",
      about: "हमारे बारे में",
      team: "हमारी टीम",
      foreignCollaborations: "विदेशी सहयोग",
      investor: "निवेशक संबंध",
      careers: "करियर",
      contact: "संपर्क करें"
    },
    hero: {
      title: "YNM मेगा इंडस्ट्रीज",
      since: "2013 से • निर्माण और निर्यात उत्कृष्टता",
      tagline1: "निर्माण उत्कृष्टता, वैश्विक पहुंच",
      tagline2: "रोड मार्किंग पेंट, फैब्रिकेशन और फर्नीचर",
      tagline3: "15+ देशों में ग्राहकों द्वारा विश्वसनीय",
      tagline4: "2013 से गुणवत्ता निर्माण",
      exploreProducts: "उत्पाद देखें",
      yearsExperience: "वर्षों का अनुभव",
      projectsDelivered: "परियोजनाएं पूर्ण",
      exportCountries: "निर्यात देश",
      happyClients: "संतुष्ट ग्राहक"
    },
    common: {
      learnMore: "और जानें",
      viewAll: "सभी देखें",
      contactUs: "संपर्क करें",
      getQuote: "कोटेशन प्राप्त करें",
      readMore: "और पढ़ें",
      close: "बंद करें",
      submit: "भेजें",
      cancel: "रद्द करें",
      noBrands: "कोई ब्रांड उपलब्ध नहीं"
    },
    // Chatbot
    chatbot: {
      title: "YNM AI सहायक",
      subtitle: "Google Gemini द्वारा संचालित",
      placeholder: "अपना प्रश्न टाइप करें...",
      quickQuestions: "त्वरित प्रश्न:",
      newChat: "नया चैट",
      exportChat: "चैट निर्यात करें",
      copyMessage: "कॉपी करें",
      helpful: "मददगार",
      notHelpful: "मददगार नहीं",
      followUp: "अनुवर्ती प्रश्न:",
      getQuote: "कोटेशन प्राप्त करें",
      scheduleVisit: "भ्रमण निर्धारित करें"
    },
    footer: {
      about: "हमारे बारे में",
      quickLinks: "त्वरित लिंक",
      contact: "संपर्क",
      followUs: "हमें फॉलो करें",
      copyright: "सभी अधिकार सुरक्षित",
      terms: "नियम और शर्तें",
      privacy: "गोपनीयता नीति",
      callNow: "अभी कॉल करें",
      emailUs: "ईमेल भेजें",
      yourSafetyPartner: "आपका सुरक्षा साथी!",
      createdBy: "बनाया गया",
      whatsAppComingSoon: "WhatsApp जल्द आ रहा है!",
      aboutText: "प्रीमियम पेंट, धातु निर्माण और स्कूल फर्नीचर के अग्रणी निर्माता और निर्यातक। 2013 से वैश्विक बाजारों में गुणवत्तापूर्ण उत्पाद पहुंचाना।"
    },
    products: {
      tag: "हमारे उत्पाद",
      title: "हम क्या निर्माण करते हैं",
      description: "प्रीमियम गुणवत्ता के उत्पाद जो घर में निर्मित हैं और दुनिया भर के 15+ देशों में ग्राहकों को निर्यात किए जाते हैं",
      explore: "अन्वेषण करें",
      viewAll: "सभी उत्पाद देखें",
      paintsTitle: "प्रीमियम पेंट",
      paintsDesc: "हर सतह के लिए उच्च गुणवत्ता वाले औद्योगिक और सजावटी पेंट। टिकाऊ, जीवंत और पर्यावरण के अनुकूल।",
      fabricationTitle: "धातु निर्माण",
      fabricationDesc: "कस्टम स्टील और धातु निर्माण समाधान। संरचनात्मक घटकों से लेकर सटीक-इंजीनियर भागों तक।",
      furnitureTitle: "स्कूल फर्नीचर",
      furnitureDesc: "शैक्षणिक संस्थानों के लिए एर्गोनोमिक और टिकाऊ फर्नीचर। डेस्क, कुर्सियां और पूर्ण कक्षा समाधान।",
      safetyTitle: "सुरक्षा उपकरण",
      safetyDesc: "औद्योगिक उपयोग के लिए प्रीमियम सुरक्षा गियर और उपकरण। हेलमेट, दस्ताने, सुरक्षात्मक पहनावा और अधिक।"
    },
    // Services Section
    services: {
      tag: "हम क्या करते हैं",
      title: "हमारे समाधान",
      description: "पूर्ण निर्माण, अनुकूलन और निर्यात समाधान",
      learnMore: "और जानें"
    },
    // Mission Section
    mission: {
      title: "हमारा मिशन और दृष्टिकोण",
      missionLabel: "हमारा मिशन",
      visionLabel: "हमारी दृष्टि"
    },
    usp: {
      tag: "हमारे बारे में",
      title: "YNM मेगा इंडस्ट्रीज के बारे में",
      subtitle: "दुनिया भर के 15+ देशों में ग्राहकों द्वारा विश्वसनीय",
      benefits: [
        { title: "उन्नत निर्माण", description: "हमारी अत्याधुनिक निर्माण सुविधा आधुनिक मशीनरी और स्वचालित प्रक्रियाओं से सुसज्जित है। हम सुसंगत, प्रीमियम-गुणवत्ता वाले उत्पादों को सुनिश्चित करने के लिए हर चरण में कड़े गुणवत्ता नियंत्रण बनाए रखते हैं।" },
        { title: "गुणवत्ता प्रमाणित", description: "हमारे सभी उत्पाद ISO 9001:2015 प्रमाणन के साथ अंतर्राष्ट्रीय गुणवत्ता मानकों को पूरा करते हैं। हम नियमित गुणवत्ता ऑडिट करते हैं और उत्पाद उत्कृष्टता सुनिश्चित करने के लिए केवल प्रीमियम कच्चे माल का उपयोग करते हैं।" },
        { title: "वैश्विक निर्यात नेटवर्क", description: "हम एशिया, अफ्रीका और मध्य पूर्व में 15+ देशों में निर्यात करते हैं। हमारी अनुभवी निर्यात टीम सहज अंतर्राष्ट्रीय वितरण के लिए दस्तावेजीकरण, रसद और सीमा शुल्क निकासी संभालती है।" },
        { title: "कस्टम समाधान", description: "हम सभी उत्पाद श्रेणियों में अनुकूलन प्रदान करते हैं - कस्टम पेंट सूत्रों से लेकर बेस्पोक निर्माण डिजाइन और ऑर्डर-मेड स्कूल फर्नीचर तक। आपके विनिर्देश, हमारी विशेषज्ञता।" }
      ]
    },
    // Testimonials Section
    testimonials: {
      title: "ग्राहक समीक्षाएं",
      subtitle: "हमारे ग्राहक YNM मेगा इंडस्ट्रीज के बारे में क्या कहते हैं"
    },
    // Brands Section
    brands: {
      tag: "हमारे साथी",
      title: "जिन ब्रांड्स के साथ हम काम करते हैं",
      description: "भारत और वैश्विक स्तर पर अग्रणी कंपनियों और संस्थानों द्वारा विश्वसनीय"
    },
    employees: {
      tag: "हमारी टीम",
      title: "हमारे कर्मचारी क्या कहते हैं",
      subtitle: "हमारे नेतृत्व टीम और प्रमुख कर्मचारियों से हमारे मिशन, मूल्यों और उत्कृष्टता के प्रति प्रतिबद्धता के बारे में सुनें",
      fallback: [
        { role: "मुख्य कार्यकारी अधिकारी (सीईओ)", department: "कार्यकारी नेतृत्व", text: "YNM मेगा इंडस्ट्रीज में, हम निर्माण उत्कृष्टता और वैश्विक विस्तार के लिए प्रतिबद्ध हैं। हमारी दृष्टि अग्रणी निर्माता और निर्यातक बनने की है, जो 15+ देशों में अपेक्षाओं से अधिक गुणवत्तापूर्ण उत्पाद प्रदान करता है।" },
        { role: "संचालन निदेशक", department: "संचालन", text: "हमारी अत्याधुनिक निर्माण सुविधा सुनिश्चित करती है कि हर उत्पाद अंतर्राष्ट्रीय गुणवत्ता मानकों को पूरा करे। हम अपनी सटीक इंजीनियरिंग और समय पर वितरण के प्रति प्रतिबद्धता पर गर्व करते हैं।" },
        { role: "निर्माण प्रमुख", department: "उत्पादन", text: "गुणवत्ता हमारे द्वारा निर्मित हर चीज के दिल में है। पेंट से लेकर निर्माण से लेकर फर्नीचर तक, हम हर चरण में कड़े गुणवत्ता नियंत्रण बनाए रखते हैं।" },
        { role: "निर्यात निदेशक", department: "अंतर्राष्ट्रीय व्यापार", text: "हमने एशिया, अफ्रीका और मध्य पूर्व में भागीदारों के साथ मजबूत संबंध बनाए हैं। हमारी निर्यात टीम परेशानी-मुक्त वैश्विक वितरण के लिए सहज रसद और दस्तावेजीकरण सुनिश्चित करती है।" },
        { role: "गुणवत्ता आश्वासन प्रमुख", department: "गुणवत्ता नियंत्रण", text: "ISO 9001:2015 प्रमाणन गुणवत्ता के प्रति हमारी प्रतिबद्धता को दर्शाता है। हर उत्पाद हमारे ग्राहकों तक पहुंचने से पहले कठोर परीक्षण और निरीक्षण से गुजरता है।" },
        { role: "बिक्री और विपणन निदेशक", department: "व्यापार विकास", text: "अपने ग्राहकों के साथ विश्वास बनाना हमारी प्राथमिकता है। हम अपने भागीदारों के साथ मिलकर उनकी जरूरतों को समझने और अनुकूलित समाधान प्रदान करने के लिए काम करते हैं।" }
      ]
    }
  }
};

// Helper: deep merge overrides onto base (en). Used for languages that share most keys with en.
function mergeWithEn(overrides) {
  const base = JSON.parse(JSON.stringify(translations.en));
  const deep = (b, o) => {
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      Object.keys(o).forEach(k => { b[k] = (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k])) ? deep(b[k], o[k]) : o[k]; });
    }
    return b;
  };
  return deep(base, overrides);
}

// Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Urdu
const _en = translations.en;
translations.bn = mergeWithEn({
  firstTime: { title: "আপনার ভাষা নির্বাচন করুন", subtitle: "ওয়েবসাইট ব্রাউজ করতে আপনার পছন্দের ভাষা নির্বাচন করুন", continue: "চালিয়ে যান" },
  nav: { home: "হোম", products: "পণ্য", clients: "ক্লায়েন্ট", about: "আমাদের সম্পর্কে", team: "আমাদের টিম", foreignCollaborations: "বৈদেশিক সহযোগিতা", investor: "বিনিয়োগকারী সম্পর্ক", careers: "ক্যারিয়ার", contact: "যোগাযোগ" },
  hero: { title: "YNM মেগা ইন্ডাস্ট্রিজ", since: "২০১৩ থেকে • উৎপাদন ও রপ্তানি উৎকর্ষ", tagline1: "উৎপাদন উৎকর্ষ, বিশ্বব্যাপী পৌঁছানো", tagline2: "রোড মার্কিং পেইন্ট, ফেব্রিকেশন ও ফার্নিচার", tagline3: "১৫+ দেশে ক্লায়েন্টদের দ্বারা বিশ্বস্ত", tagline4: "২০১৩ থেকে মানসম্মত উৎপাদন", exploreProducts: "পণ্য ঘুরে দেখুন", yearsExperience: "বছরের অভিজ্ঞতা", projectsDelivered: "প্রকল্প সম্পন্ন", exportCountries: "রপ্তানি দেশ", happyClients: "সন্তুষ্ট ক্লায়েন্ট" },
  common: { learnMore: "আরও জানুন", viewAll: "সব দেখুন", contactUs: "যোগাযোগ", getQuote: "কোট নিন", readMore: "আরও পড়ুন", close: "বন্ধ", submit: "জমা দিন", cancel: "বাতিল", noBrands: "কোন ব্র্যান্ড উপলব্ধ নেই" },
  footer: { about: "আমাদের সম্পর্কে", quickLinks: "দ্রুত লিংক", contact: "যোগাযোগ", followUs: "আমাদের অনুসরণ করুন", terms: "নিয়ম ও শর্তাবলী", privacy: "গোপনীয়তা নীতি", callNow: "এখনই কল করুন", yourSafetyPartner: "আপনার সুরক্ষা অংশীদার!", createdBy: "তৈরি করেছেন", whatsAppComingSoon: "WhatsApp শীঘ্রই আসছে!", aboutText: "প্রিমিয়াম পেইন্ট, ধাতব ফেব্রিকেশন ও স্কুল ফার্নিচারের শীর্ষ প্রস্তুতকারক ও রপ্তানিকারক। ২০১৩ থেকে বিশ্ববাজারে মানসম্মত পণ্য।" },
  products: { tag: "আমাদের পণ্য", title: "আমরা কী উৎপাদন করি", description: "প্রিমিয়াম মানের পণ্য যা ঘরে উৎপাদিত এবং বিশ্বের ১৫+ দেশে রপ্তানি করা হয়", explore: "ঘুরে দেখুন", viewAll: "সব পণ্য দেখুন", paintsTitle: "প্রিমিয়াম পেইন্ট", paintsDesc: "প্রতিটি পৃষ্ঠের জন্য উচ্চমানের শিল্প ও সজ্জামূলক পেইন্ট।", fabricationTitle: "ধাতব ফেব্রিকেশন", fabricationDesc: "কাস্টম স্টিল ও ধাতব ফেব্রিকেশন সমাধান।", furnitureTitle: "স্কুল ফার্নিচার", furnitureDesc: "শিক্ষা প্রতিষ্ঠানের জন্য আরগোনমিক এবং টেকসই ফার্নিচার।", safetyTitle: "সুরক্ষা সরঞ্জাম", safetyDesc: "শিল্প ব্যবহারের জন্য প্রিমিয়াম সুরক্ষা গিয়ার।" },
  usp: { tag: "আমাদের সম্পর্কে", title: "YNM মেগা ইন্ডাস্ট্রিজ সম্পর্কে", subtitle: "বিশ্বের ১৫+ দেশে ক্লায়েন্টদের দ্বারা বিশ্বস্ত" },
  testimonials: { title: "প্রশংসাপত্র", subtitle: "আমাদের ক্লায়েন্টরা YNM মেগা ইন্ডাস্ট্রিজ সম্পর্কে কী বলেন" },
  brands: { tag: "আমাদের অংশীদার", title: "যেসব ব্র্যান্ডের সাথে আমরা কাজ করি", description: "ভারত ও বিশ্বজুড়ে শীর্ষ কোম্পানি ও প্রতিষ্ঠান দ্বারা বিশ্বস্ত" },
  employees: { tag: "আমাদের টিম", title: "আমাদের কর্মীরা কী বলেন", subtitle: "আমাদের মিশন, মূল্যবোধ ও উৎকর্ষের প্রতি প্রতিশ্রুতি সম্পর্কে নেতৃত্ব দল ও প্রধান কর্মীদের কাছ থেকে শুনুন" }
});
translations.te = mergeWithEn({
  firstTime: { title: "మీ భాషను ఎంచుకోండి", subtitle: "వెబ్‌సైట్ బ్రౌజ్ చేయడానికి మీకు నచ్చిన భాషను ఎంచుకోండి", continue: "కొనసాగించు" },
  nav: { home: "హోమ్", products: "ఉత్పత్తులు", clients: "క్లయింట్లు", about: "మా గురించి", team: "మా బృందం", foreignCollaborations: "విదేశీ సహకారాలు", investor: "పెట్టుబడిదారు సంబంధాలు", careers: "కెరీర్లు", contact: "సంప్రదించండి" },
  hero: { title: "YNM మెగా ఇండస్ట్రీస్", since: "2013 నుండి • వినిర్మాణం మరియు ఎగుమతి ఉత్కృష్టత", tagline1: "వినిర్మాణ ఉత్కృష్టత, గ్లోబల్ రీచ్", tagline2: "రోడ్ మార్కింగ్ పెయింట్స్, ఫ్యాబ్రికేషన్స్ మరియు ఫర్నిచర్", tagline3: "15+ దేశాలలో క్లయింట్లచే విశ్వసించబడుతోంది", tagline4: "2013 నుండి నాణ్యత వినిర్మాణం", exploreProducts: "ఉత్పత్తులు అన్వేషించండి", yearsExperience: "సంవత్సరాల అనుభవం", projectsDelivered: "ప్రాజెక్టులు పూర్తయ్యాయి", exportCountries: "ఎగుమతి దేశాలు", happyClients: "సంతృప్త క్లయింట్లు" },
  common: { learnMore: "మరింత తెలుసుకోండి", viewAll: "అన్నీ చూడండి", contactUs: "సంప్రదించండి", getQuote: "కోట్ పొందండి", readMore: "మరింత చదవండి", close: "మూసివేయి", submit: "సమర్పించండి", cancel: "రద్దు", noBrands: "బ్రాండ్లు అందుబాటులో లేవు" },
  footer: { about: "మా గురించి", quickLinks: "త్వరిత లింకులు", contact: "సంప్రదించండి", followUs: "మమ్మల్ని ఫాలో అవ్వండి", terms: "నిబంధనలు మరియు షరతులు", privacy: "గోప్యతా విధానం", callNow: "ఇప్పుడు కాల్ చేయండి", yourSafetyPartner: "మీ భద్రతా భాగస్వామి!", createdBy: "సృష్టించినవారు", whatsAppComingSoon: "WhatsApp త్వరలో వస్తోంది!", aboutText: "ప్రీమియం పెయింట్స్, మెటల్ ఫ్యాబ్రికేషన్స్ మరియు స్కూల్ ఫర్నిచర్ యొక్క ప్రముఖ తయారీదారు మరియు ఎగుమతిదారు। 2013 నుండి గ్లోబల్ మార్కెట్‌లకు నాణ్యత ఉత్పత్తులు।" },
  products: { tag: "మా ఉత్పత్తులు", title: "మేము ఏమి తయారు చేస్తాము", description: "ఇంట్లో తయారు చేయబడిన మరియు ప్రపంచవ్యాప్తంగా 15+ దేశాలకు ఎగుమతి చేయబడిన ప్రీమియం నాణ్యత ఉత్పత్తులు", explore: "అన్వేషించండి", viewAll: "అన్ని ఉత్పత్తులు చూడండి", paintsTitle: "ప్రీమియం పెయింట్స్", paintsDesc: "ప్రతి ఉపరితలానికి అధిక-నాణ్యత పారిశ్రామిక మరియు అలంకార పెయింట్స్।", fabricationTitle: "మెటల్ ఫ్యాబ్రికేషన్", fabricationDesc: "కస్టమ్ స్టీల్ మరియు మెటల్ ఫ్యాబ్రికేషన్ సొల్యూషన్లు।", furnitureTitle: "స్కూల్ ఫర్నిచర్", furnitureDesc: "ఎడ్యుకేషనల్ సంస్థల కోసం ఎర్గోనామిక్ మరియు మన్నికైన ఫర్నిచర్।", safetyTitle: "భద్రతా పరికరాలు", safetyDesc: "పారిశ్రామిక ఉపయోగం కోసం ప్రీమియం భద్రతా గియర్।" },
  usp: { tag: "మా గురించి", title: "YNM మెగా ఇండస్ట్రీస్ గురించి", subtitle: "ప్రపంచవ్యాప్తంగా 15+ దేశాలలో క్లయింట్లచే విశ్వసించబడుతోంది" },
  testimonials: { title: "బహుమతులు", subtitle: "మా క్లయింట్లు YNM మెగా ఇండస్ట్రీస్ గురించి ఏమి అంటున్నారు" },
  brands: { tag: "మా భాగస్వాములు", title: "మేము పనిచేసే బ్రాండ్లు", description: "భారతదేశం మరియు ప్రపంచవ్యాప్తంగా ప్రముఖ కంపెనీలు మరియు సంస్థలచే విశ్వసించబడుతోంది" },
  employees: { tag: "మా బృందం", title: "మా ఉద్యోగులు ఏమి చెబుతారు", subtitle: "మా మిషన్, విలువలు మరియు ఉత్కృష్టతకు మా నిబద్ధత గురించి నాయకత్వ బృందం మరియు ముఖ్య ఉద్యోగుల నుండి వినండి" }
});
translations.mr = mergeWithEn({
  firstTime: { title: "तुमची भाषा निवडा", subtitle: "वेबसाइट ब्राउझ करण्यासाठी तुमची पसंतीची भाषा निवडा", continue: "सुरू ठेवा" },
  nav: { home: "मुख्यपृष्ठ", products: "उत्पादने", clients: "ग्राहक", about: "आमच्याबद्दल", team: "आमची टीम", foreignCollaborations: "परदेशी सहकार्य", investor: "गुंतवणूकदार संबंध", careers: "करिअर", contact: "संपर्क करा" },
  hero: { title: "YNM मेगा इंडस्ट्रीज", since: "२०१३ पासून • उत्पादन आणि निर्यात उत्कृष्टता", tagline1: "उत्पादन उत्कृष्टता, जागतिक पोहोच", tagline2: "रोड मार्किंग पेंट्स, फॅब्रिकेशन्स आणि फर्निचर", tagline3: "१५+ देशांमध्ये ग्राहकांद्वारे विश्वास", tagline4: "२०१३ पासून गुणवत्ता उत्पादन", exploreProducts: "उत्पादने अन्वेषण करा", yearsExperience: "वर्षांचा अनुभव", projectsDelivered: "प्रकल्प पूर्ण", exportCountries: "निर्यात देश", happyClients: "समाधानी ग्राहक" },
  common: { learnMore: "अधिक जाणून घ्या", viewAll: "सर्व पहा", contactUs: "संपर्क करा", getQuote: "क्वॉट मिळवा", readMore: "अधिक वाचा", close: "बंद", submit: "सादर करा", cancel: "रद्द", noBrands: "ब्रँड उपलब्ध नाहीत" },
  footer: { about: "आमच्याबद्दल", quickLinks: "जलद दुवे", contact: "संपर्क", followUs: "आमचे अनुसरण करा", terms: "अटी आणि नियम", privacy: "गोपनीयता धोरण", callNow: "आता कॉल करा", yourSafetyPartner: "तुमचा सुरक्षा भागीदार!", createdBy: "तयार केले", whatsAppComingSoon: "WhatsApp लवकर येत आहे!", aboutText: "प्रीमियम पेंट्स, मेटल फॅब्रिकेशन्स आणि स्कूल फर्निचरचे अग्रणी उत्पादक आणि निर्यातदार। २०१३ पासून जागतिक बाजारपेठेसाठी गुणवत्ता उत्पादने।" },
  products: { tag: "आमची उत्पादने", title: "आम्ही काय उत्पादन करतो", description: "घरात उत्पादित आणि जगभरात १५+ देशांना निर्यात केलेली प्रीमियम गुणवत्तेची उत्पादने", explore: "अन्वेषण करा", viewAll: "सर्व उत्पादने पहा", paintsTitle: "प्रीमियम पेंट्स", paintsDesc: "प्रत्येक पृष्ठभागासाठी उच्च-गुणवत्तेचे औद्योगिक आणि सजावटी पेंट्स।", fabricationTitle: "मेटल फॅब्रिकेशन", fabricationDesc: "सानुकूल स्टील आणि मेटल फॅब्रिकेशन उपाय।", furnitureTitle: "स्कूल फर्निचर", furnitureDesc: "शैक्षणिक संस्थांसाठी एर्गोनॉमिक आणि टिकाऊ फर्निचर।", safetyTitle: "सुरक्षा उपकरणे", safetyDesc: "औद्योगिक वापरासाठी प्रीमियम सुरक्षा गियर।" },
  usp: { tag: "आमच्याबद्दल", title: "YNM मेगा इंडस्ट्रीज बद्दल", subtitle: "जगभरात १५+ देशांमध्ये ग्राहकांद्वारे विश्वास" },
  testimonials: { title: "पुनरुत्थाने", subtitle: "आमचे ग्राहक YNM मेगा इंडस्ट्रीज बद्दल काय म्हणतात" },
  brands: { tag: "आमचे भागीदार", title: "आम्ही ज्या ब्रँड्ससोबत काम करतो", description: "भारत आणि जागतिक स्तरावर अग्रणी कंपन्या आणि संस्थांद्वारे विश्वास" },
  employees: { tag: "आमची टीम", title: "आमचे कर्मचारी काय म्हणतात", subtitle: "आमचे मिशन, मूल्ये आणि उत्कृष्टतेची निष्ठा याबद्दल नेतृत्व टीम आणि मुख्य कर्मचार्यांकडून ऐका" }
});
translations.ta = mergeWithEn({
  firstTime: { title: "உங்கள் மொழியை தேர்ந்தெடுக்கவும்", subtitle: "இணையதளத்தை உலாவ உங்களுக்கு விருப்பமான மொழியை தேர்ந்தெடுக்கவும்", continue: "தொடரவும்" },
  nav: { home: "முகப்பு", products: "தயாரிப்புகள்", clients: "வாடிக்கையாளர்கள்", about: "எங்களைப் பற்றி", team: "எங்கள் குழு", foreignCollaborations: "வெளிநாடு ஒத்துழைப்புகள்", investor: "முதலீட்டாளர் உறவுகள்", careers: "வளர்ச்சிப் பாதைகள்", contact: "தொடர்பு கொள்ளுங்கள்" },
  hero: { title: "YNM மெகா இன்டஸ்ட்ரீஸ்", since: "2013 முதல் • உற்பத்தி மற்றும் ஏற்றுமதி சிறப்பு", tagline1: "உற்பத்தி சிறப்பு, உலகளாவிய அணுகல்", tagline2: "சாலை குறி வர்ணங்கள், பணியகங்கள் மற்றும் தளவாடங்கள்", tagline3: "15+ நாடுகளில் வாடிக்கையாளர்களால் நம்பப்படுகிறது", tagline4: "2013 முதல் தரமான உற்பத்தி", exploreProducts: "தயாரிப்புகளை ஆராயுங்கள்", yearsExperience: "ஆண்டுகள் அனுபவம்", projectsDelivered: "திட்டங்கள் நிறைவு", exportCountries: "ஏற்றுமதி நாடுகள்", happyClients: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  common: { learnMore: "மேலும் அறிக", viewAll: "அனைத்தையும் பார்க்க", contactUs: "தொடர்பு கொள்ளுங்கள்", getQuote: "மேற்கோள் பெறுக", readMore: "மேலும் படிக்க", close: "மூடு", submit: "சமர்ப்பி", cancel: "ரத்து", noBrands: "பிராண்டுகள் இல்லை" },
  footer: { about: "எங்களைப் பற்றி", quickLinks: "விரைவு இணைப்புகள்", contact: "தொடர்பு", followUs: "எங்களைப் பின்தொடரவும்", terms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்", privacy: "தனியுரிமைக் கொள்கை", callNow: "இப்போது அழைக்கவும்", yourSafetyPartner: "உங்கள் பாதுகாப்பு கூட்டாளி!", createdBy: "உருவாக்கியவர்", whatsAppComingSoon: "WhatsApp விரைவில் வருகிறது!", aboutText: "பிரீமியம் பெயிண்ட்ஸ், மெட்டல் ஃபேப்ரிகேஷன்ஸ் மற்றும் பள்ளி தளவாடங்களின் முன்னணி உற்பத்தியாளர் மற்றும் ஏற்றுமதியாளர்। 2013 முதல் உலக சந்தைகளுக்கு தரமான தயாரிப்புகள்।" },
  products: { tag: "எங்கள் தயாரிப்புகள்", title: "நாங்கள் என்ன உற்பத்தி செய்கிறோம்", description: "வீட்டில் உற்பத்தி செய்யப்பட்ட மற்றும் உலகளவில் 15+ நாடுகளுக்கு ஏற்றுமதி செய்யப்படும் பிரீமியம் தர தயாரிப்புகள்", explore: "ஆராயுங்கள்", viewAll: "அனைத்து தயாரிப்புகளையும் பார்க்கவும்", paintsTitle: "பிரீமியம் பெயிண்ட்ஸ்", paintsDesc: "ஒவ்வொரு மேற்பரப்பிற்கும் உயர் தரத் தொழில்துறை மற்றும் அலங்கார பெயிண்ட்ஸ்।", fabricationTitle: "மெட்டல் ஃபேப்ரிகேஷன்", fabricationDesc: "தனிப்பயன் எஃகு மற்றும் உலோக பணியக தீர்வுகள்।", furnitureTitle: "பள்ளி தளவாடங்கள்", furnitureDesc: "கல்வி நிறுவனங்களுக்கான எர்கோனாமிக் மற்றும் நீடித்த தளவாடங்கள்।", safetyTitle: "பாதுகாப்பு உபகரணங்கள்", safetyDesc: "தொழில்துறை பயன்பாட்டிற்கான பிரீமியம் பாதுகாப்பு கியர்।" },
  usp: { tag: "எங்களைப் பற்றி", title: "YNM மெகா இன்டஸ்ட்ரீஸ் பற்றி", subtitle: "உலகளவில் 15+ நாடுகளில் வாடிக்கையாளர்களால் நம்பப்படுகிறது" },
  testimonials: { title: "பாராட்டுகள்", subtitle: "எங்கள் வாடிக்கையாளர்கள் YNM மெகா இன்டஸ்ட்ரீஸ் பற்றி என்ன சொல்கிறார்கள்" },
  brands: { tag: "எங்கள் கூட்டாளர்கள்", title: "நாங்கள் பணிபுரியும் பிராண்டுகள்", description: "இந்தியா மற்றும் உலகளவில் முன்னணி நிறுவனங்கள் மற்றும் நிறுவனங்களால் நம்பப்படுகிறது" },
  employees: { tag: "எங்கள் குழு", title: "எங்கள் பணியாளர்கள் என்ன சொல்கிறார்கள்", subtitle: "எங்கள் நோக்கம், மதிப்புகள் மற்றும் சிறப்புக்கான எங்கள் அர்ப்பணிப்பு பற்றி தலைமை குழு மற்றும் முக்கிய ஊழியர்களிடமிருந்து கேளுங்கள்" }
});
translations.gu = mergeWithEn({
  firstTime: { title: "તમારી ભાષા પસંદ કરો", subtitle: "વેબસાઇટ બ્રાઉઝ કરવા માટે તમારી પસંદગીની ભાષા પસંદ કરો", continue: "ચાલુ રાખો" },
  nav: { home: "હોમ", products: "ઉત્પાદનો", clients: "ગ્રાહકો", about: "અમારા વિશે", team: "અમારી ટીમ", foreignCollaborations: "વિદેશી સહયોગ", investor: "ગુમાવણુકદાર સંબંધો", careers: "કારકિર્દી", contact: "સંપર્ક કરો" },
  hero: { title: "YNM મેગા ઇન્ડસ્ટ્રીઝ", since: "2013થી • ઉત્પાદન અને નિકાસ ઉત્કૃષ્ટતા", tagline1: "ઉત્પાદન ઉત્કૃષ્ટતા, ગ્લોબલ રીચ", tagline2: "રોડ માર્કિંગ પેઇન્ટ્સ, ફેબ્રિકેશન્સ અને ફર્નિચર", tagline3: "15+ દેશોમાં ગ્રાહકો દ્વારા વિશ્વાસ", tagline4: "2013થી ગુણવત્તાયુક્ત ઉત્પાદન", exploreProducts: "ઉત્પાદનો અન્વેષણ કરો", yearsExperience: "વર્ષનો અનુભવ", projectsDelivered: "પ્રોજેક્ટ્સ પૂર્ણ", exportCountries: "નિકાસ દેશો", happyClients: "સંતુષ્ટ ગ્રાહકો" },
  common: { learnMore: "વધુ શીખો", viewAll: "બધું જુઓ", contactUs: "સંપર્ક કરો", getQuote: "ક્વોટ મેળવો", readMore: "વધુ વાંચો", close: "બંધ", submit: "જમા કરો", cancel: "રદ", noBrands: "બ્રાન્ડ ઉપલબ્ધ નથી" },
  footer: { about: "અમારા વિશે", quickLinks: "ઝડપી લિંક્સ", contact: "સંપર્ક", followUs: "અમને અનુસરો", terms: "નિયમો અને શરતો", privacy: "ગોપનીયતા નીતિ", callNow: "હવે કૉલ કરો", yourSafetyPartner: "તમારા સલામતી ભાગીદાર!", createdBy: "બનાવનાર", whatsAppComingSoon: "WhatsApp ટૂંક સમયમાં આવી રહ્યું છે!", aboutText: "પ્રીમિયમ પેઇન્ટ્સ, મેટલ ફેબ્રિકેશન્સ અને સ્કૂલ ફર્નિચરના અગ્રણી ઉત્પાદક અને નિકાસકર્તા। 2013થી ગ્લોબલ માર્કેટો માટે ગુણવત્તાયુક્ત ઉત્પાદનો।" },
  products: { tag: "અમારા ઉત્પાદનો", title: "અમે શું ઉત્પાદન કરીએ છીએ", description: "ઘરે ઉત્પાદિત અને વિશ્વભરમાં 15+ દેશોમાં નિકાસ કરાયેલા પ્રીમિયમ ગુણવત્તાના ઉત્પાદનો", explore: "અન્વેષણ કરો", viewAll: "બધા ઉત્પાદનો જુઓ", paintsTitle: "પ્રીમિયમ પેઇન્ટ્સ", paintsDesc: "દરેક સપાટી માટે ઉચ્ચ-ગુણવત્તાના ઔદ્યોગિક અને સજાવટી પેઇન્ટ્સ।", fabricationTitle: "મેટલ ફેબ્રિકેશન", fabricationDesc: "કસ્ટમ સ્ટીલ અને મેટલ ફેબ્રિકેશન સોલ્યુશન્સ।", furnitureTitle: "સ્કૂલ ફર્નિચર", furnitureDesc: "શિક્ષણ સંસ્થાઓ માટે એર્ગોનોમિક અને ટકાઉ ફર્નિચર।", safetyTitle: "સલામતી ઉપકરણો", safetyDesc: "ઔદ્યોગિક ઉપયોગ માટે પ્રીમિયમ સલામતી ગિયર।" },
  usp: { tag: "અમારા વિશે", title: "YNM મેગા ઇન્ડસ્ટ્રીઝ વિશે", subtitle: "વિશ્વભરમાં 15+ દેશોમાં ગ્રાહકો દ્વારા વિશ્વાસ" },
  testimonials: { title: "પ્રશંસાપત્રો", subtitle: "અમારા ગ્રાહકો YNM મેગા ઇન્ડસ્ટ્રીઝ વિશે શું કહે છે" },
  brands: { tag: "અમારા ભાગીદારો", title: "જે બ્રાન્ડ્સ સાથે અમે કામ કરીએ છીએ", description: "ભારત અને વિશ્વભરમાં અગ્રણી કંપનીઓ અને સંસ્થાઓ દ્વારા વિશ્વાસ" },
  employees: { tag: "અમારી ટીમ", title: "અમારા કર્મચારીઓ શું કહે છે", subtitle: "અમારા મિશન, મૂલ્યો અને ઉત્કૃષ્ટતા માટેની ઉંડી નિષ્ઠા વિશે લિડરશિપ ટીમ અને મુખ્ય કર્મચારીઓ પાસેથી સાંભળો" }
});
translations.kn = mergeWithEn({
  firstTime: { title: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", subtitle: "ವೆಬ್‌ಸೈಟ್ ಬ್ರೌಜ್ ಮಾಡಲು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", continue: "ಮುಂದುವರಿಸಿ" },
  nav: { home: "ಮುಖಪುಟ", products: "ಉತ್ಪನ್ನಗಳು", clients: "ಕ್ಲೈಂಟ್‌ಗಳು", about: "ನಮ್ಮ ಬಗ್ಗೆ", team: "ನಮ್ಮ ತಂಡ", foreignCollaborations: "ವಿದೇಶಿ ಸಹಯೋಗ", investor: "ಹೂಡಿಕೆದಾರರ ಸಂಬಂಧಗಳು", careers: "ವೃತ್ತಿಜೀವನ", contact: "ಸಂಪರ್ಕಿಸಿ" },
  hero: { title: "YNM ಮೆಗಾ ಇಂಡಸ್ಟ್ರೀಸ್", since: "2013 ರಿಂದ • ಉತ್ಪಾದನೆ ಮತ್ತು ರಫ್ತು ಶ್ರೇಷ್ಠತೆ", tagline1: "ಉತ್ಪಾದನಾ ಶ್ರೇಷ್ಠತೆ, ಜಾಗತಿಕ ವ್ಯಾಪ್ತಿ", tagline2: "ರೋಡ್ ಮಾರ್ಕಿಂಗ್ ಪೇಂಟ್ಸ್, ಫ್ಯಾಬ್ರಿಕೇಷನ್ಸ್ ಮತ್ತು ಫರ್ನಿಚರ್", tagline3: "15+ ದೇಶಗಳಲ್ಲಿ ಕ್ಲೈಂಟ್‌ಗಳಿಂದ ನಂಬಲಾಗಿದೆ", tagline4: "2013 ರಿಂದ ಗುಣಮಟ್ಟದ ಉತ್ಪಾದನೆ", exploreProducts: "ಉತ್ಪನ್ನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", yearsExperience: "ವರ್ಷಗಳ ಅನುಭವ", projectsDelivered: "ಯೋಜನೆಗಳು ಪೂರ್ಣ", exportCountries: "ರಫ್ತು ದೇಶಗಳು", happyClients: "ತೃಪ್ತ ಕ್ಲೈಂಟ್‌ಗಳು" },
  common: { learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", viewAll: "ಎಲ್ಲಾ ನೋಡಿ", contactUs: "ಸಂಪರ್ಕಿಸಿ", getQuote: "ಕೋಟ್ ಪಡೆಯಿರಿ", readMore: "ಇನ್ನಷ್ಟು ಓದಿ", close: "ಮುಚ್ಚಿ", submit: "ಸಲ್ಲಿಸಿ", cancel: "ರದ್ದು", noBrands: "ಬ್ರಾಂಡ್‌ಗಳು ಲಭ್ಯವಿಲ್ಲ" },
  footer: { about: "ನಮ್ಮ ಬಗ್ಗೆ", quickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು", contact: "ಸಂಪರ್ಕ", followUs: "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ", terms: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು", privacy: "ಗೌಪ್ಯತಾ ನೀತಿ", callNow: "ಈಗ ಕರೆ ಮಾಡಿ", yourSafetyPartner: "ನಿಮ್ಮ ಸುರಕ್ಷತಾ ಪಾಲುದಾರ!", createdBy: "ಸೃಷ್ಟಿಸಿದವರು", whatsAppComingSoon: "WhatsApp ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ!", aboutText: "ಪ್ರೀಮಿಯಂ ಪೇಂಟ್ಸ್, ಮೆಟಲ್ ಫ್ಯಾಬ್ರಿಕೇಷನ್ಸ್ ಮತ್ತು ಶಾಲಾ ಫರ್ನಿಚರ್‌ನ ಪ್ರಮುಖ ಉತ್ಪಾದಕ ಮತ್ತು ರಫ್ತುದಾರ। 2013 ರಿಂದ ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳು।" },
  products: { tag: "ನಮ್ಮ ಉತ್ಪನ್ನಗಳು", title: "ನಾವು ಏನು ಉತ್ಪಾದಿಸುತ್ತೇವೆ", description: "ಮನೆಯಲ್ಲಿ ಉತ್ಪಾದಿಸಲ್ಪಟ್ಟ ಮತ್ತು ಪ್ರಪಂಚದ 15+ ದೇಶಗಳಿಗೆ ರಫ್ತು ಮಾಡಲ್ಪಟ್ಟ ಪ್ರೀಮಿಯಂ ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳು", explore: "ಅನ್ವೇಷಿಸಿ", viewAll: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ", paintsTitle: "ಪ್ರೀಮಿಯಂ ಪೇಂಟ್ಸ್", paintsDesc: "ಪ್ರತಿ ಮೇಲ್ಮೈಗೆ ಉಚ್ಚ-ಗುಣಮಟ್ಟದ ಕೈಗಾರಿಕಾ ಮತ್ತು ಅಲಂಕಾರಿಕ ಪೇಂಟ್ಸ್।", fabricationTitle: "ಮೆಟಲ್ ಫ್ಯಾಬ್ರಿಕೇಷನ್", fabricationDesc: "ಕಸ್ಟಮ್ ಸ್ಟೀಲ್ ಮತ್ತು ಮೆಟಲ್ ಫ್ಯಾಬ್ರಿಕೇಷನ್ ಪರಿಹಾರಗಳು।", furnitureTitle: "ಶಾಲಾ ಫರ್ನಿಚರ್", furnitureDesc: "ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆಗಳಿಗಾಗಿ ಎರ್ಗೋನಾಮಿಕ್ ಮತ್ತು ಸಹನಶೀಲ ಫರ್ನಿಚರ್।", safetyTitle: "ಸುರಕ್ಷತಾ ಉಪಕರಣಗಳು", safetyDesc: "ಕೈಗಾರಿಕಾ ಬಳಕೆಗಾಗಿ ಪ್ರೀಮಿಯಂ ಸುರಕ್ಷತಾ ಗಿಯರ್।" },
  usp: { tag: "ನಮ್ಮ ಬಗ್ಗೆ", title: "YNM ಮೆಗಾ ಇಂಡಸ್ಟ್ರೀಸ್ ಬಗ್ಗೆ", subtitle: "ಪ್ರಪಂಚದ 15+ ದೇಶಗಳಲ್ಲಿ ಕ್ಲೈಂಟ್‌ಗಳಿಂದ ನಂಬಲಾಗಿದೆ" },
  testimonials: { title: "ಉಲ್ಲೇಖಗಳು", subtitle: "ನಮ್ಮ ಕ್ಲೈಂಟ್‌ಗಳು YNM ಮೆಗಾ ಇಂಡಸ್ಟ್ರೀಸ್ ಬಗ್ಗೆ ಏನು ಹೇಳುತ್ತಾರೆ" },
  brands: { tag: "ನಮ್ಮ ಪಾಲುದಾರರು", title: "ನಾವು ಕೆಲಸ ಮಾಡುವ ಬ್ರಾಂಡ್‌ಗಳು", description: "ಭಾರತ ಮತ್ತು ಜಾಗತಿಕವಾಗಿ ಪ್ರಮುಖ ಕಂಪನಿಗಳು ಮತ್ತು ಸಂಸ್ಥೆಗಳಿಂದ ನಂಬಲಾಗಿದೆ" },
  employees: { tag: "ನಮ್ಮ ತಂಡ", title: "ನಮ್ಮ ಉದ್ಯೋಗಿಗಳು ಏನು ಹೇಳುತ್ತಾರೆ", subtitle: "ನಮ್ಮ ಮಿಷನ್, ಮೌಲ್ಯಗಳು ಮತ್ತು ಶ್ರೇಷ್ಠತೆಗೆ ನಮ್ಮ ಬದ್ಧತೆ ಬಗ್ಗೆ ನಾಯಕತ್ವ ತಂಡ ಮತ್ತು ಪ್ರಮುಖ ಉದ್ಯೋಗಿಗಳಿಂದ ಕೇಳಿ" }
});
translations.ml = mergeWithEn({
  firstTime: { title: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക", subtitle: "വെബ്‌സൈറ്റ് ബ്രൗസ് ചെയ്യാൻ നിങ്ങളുടെ പ്രിയപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക", continue: "തുടരുക" },
  nav: { home: "ഹോം", products: "ഉത്പന്നങ്ങൾ", clients: "ക്ലയന്റുകൾ", about: "ഞങ്ങളെക്കുറിച്ച്", team: "ഞങ്ങളുടെ ടീം", foreignCollaborations: "വിദേശ സഹകരണം", investor: "നിക്ഷേപക ബന്ധങ്ങൾ", careers: "കരിയർ", contact: "ബന്ധപ്പെടുക" },
  hero: { title: "YNM മെഗാ ഇൻഡസ്ട്രീസ്", since: "2013 മുതൽ • നിർമ്മാണവും എക്‌സ്‌പോർട്ട് ശ്രേഷ്ഠതയും", tagline1: "നിർമ്മാണ ശ്രേഷ്ഠത, ആഗോള എത്തിച്ചേരൽ", tagline2: "റോഡ് മാർക്കിംഗ് പെയിന്റുകൾ, ഫാബ്രിക്കേഷനുകൾ, ഫർനിച്ചർ", tagline3: "15+ രാജ്യങ്ങളിൽ ക്ലയന്റുകളാൽ വിശ്വസിക്കപ്പെടുന്നു", tagline4: "2013 മുതൽ ഗുണമേന്മയുള്ള നിർമ്മാണം", exploreProducts: "ഉത്പന്നങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക", yearsExperience: "വർഷങ്ങളുടെ പരിചയം", projectsDelivered: "പ്രോജക്റ്റുകൾ നിറവേറ്റി", exportCountries: "എക്‌സ്‌പോർട്ട് രാജ്യങ്ങൾ", happyClients: "സന്തുഷ്ട ക്ലയന്റുകൾ" },
  common: { learnMore: "കൂടുതൽ അറിയുക", viewAll: "എല്ലാം കാണുക", contactUs: "ബന്ധപ്പെടുക", getQuote: "ക്വോട്ട് നേടുക", readMore: "കൂടുതൽ വായിക്കുക", close: "അടയ്ക്കുക", submit: "സമർപ്പിക്കുക", cancel: "റദ്ദാക്കുക", noBrands: "ബ്രാൻഡുകൾ ലഭ്യമല്ല" },
  footer: { about: "ഞങ്ങളെക്കുറിച്ച്", quickLinks: "ശീഘ്ര ലിങ്കുകൾ", contact: "ബന്ധപ്പെടുക", followUs: "ഞങ്ങളെ പിന്തുടരുക", terms: "നിബന്ധനകളും നിബന്ധനകളും", privacy: "സ്വകാര്യതാനയം", callNow: "ഇപ്പോൾ വിളിക്കുക", yourSafetyPartner: "നിങ്ങളുടെ സുരക്ഷാ പങ്കാളി!", createdBy: "സൃഷ്ടിച്ചത്", whatsAppComingSoon: "WhatsApp ഉടൻ വരുന്നു!", aboutText: "പ്രീമിയം പെയിന്റുകൾ, മെറ്റൽ ഫാബ്രിക്കേഷനുകൾ, സ്കൂൾ ഫർനിച്ചർ എന്നിവയുടെ മുൻനിര നിർമ്മാതാവും എക്‌സ്‌പോർട്ടറും। 2013 മുതൽ ആഗോള വിപണികൾക്ക് ഗുണമേന്മയുള്ള ഉത്പന്നങ്ങൾ।" },
  products: { tag: "ഞങ്ങളുടെ ഉത്പന്നങ്ങൾ", title: "ഞങ്ങൾ എന്താണ് നിർമ്മിക്കുന്നത്", description: "വീട്ടിൽ നിർമ്മിച്ച് ലോകമെമ്പാടും 15+ രാജ്യങ്ങളിലേക്ക് എക്‌സ്‌പോർട്ട് ചെയ്യുന്ന പ്രീമിയം ഗുണമേന്മയുള്ള ഉത്പന്നങ്ങൾ", explore: "പര്യവേക്ഷണം ചെയ്യുക", viewAll: "എല്ലാ ഉത്പന്നങ്ങളും കാണുക", paintsTitle: "പ്രീമിയം പെയിന്റുകൾ", paintsDesc: "എല്ലാ ഉപരിതലത്തിനും ഉയർന്ന ഗുണമേന്മയുള്ള ഇൻഡസ്ട്രിയൽ, ഡെക്കോറേറ്റീവ് പെയിന്റുകൾ।", fabricationTitle: "മെറ്റൽ ഫാബ്രിക്കേഷൻ", fabricationDesc: "കസ്റ്റം സ്റ്റീൽ, മെറ്റൽ ഫാബ്രിക്കേഷൻ പരിഹാരങ്ങൾ।", furnitureTitle: "സ്കൂൾ ഫർനിച്ചർ", furnitureDesc: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾക്കായി എർഗോണോമിക്, സ്ഥിരതയുള്ള ഫർനിച്ചർ।", safetyTitle: "സുരക്ഷാ ഉപകരണങ്ങൾ", safetyDesc: "ഇൻഡസ്ട്രിയൽ ഉപയോഗത്തിനുള്ള പ്രീമിയം സുരക്ഷാ ഗിയർ।" },
  usp: { tag: "ഞങ്ങളെക്കുറിച്ച്", title: "YNM മെഗാ ഇൻഡസ്ട്രീസിനെക്കുറിച്ച്", subtitle: "ലോകമെമ്പാടും 15+ രാജ്യങ്ങളിൽ ക്ലയന്റുകളാൽ വിശ്വസിക്കപ്പെടുന്നു" },
  testimonials: { title: "സാക്ഷ്യം", subtitle: "ഞങ്ങളുടെ ക്ലയന്റുകൾ YNM മെഗാ ഇൻഡസ്ട്രീസിനെക്കുറിച്ച് എന്താണ് പറയുന്നത്" },
  brands: { tag: "ഞങ്ങളുടെ പങ്കാളികൾ", title: "ഞങ്ങൾ സഹകരിക്കുന്ന ബ്രാൻഡുകൾ", description: "ഇന്ത്യ, ലോകമെമ്പാടുമുള്ള മുൻനിര കമ്പനികൾ, സ്ഥാപനങ്ങളാൽ വിശ്വസിക്കപ്പെടുന്നു" },
  employees: { tag: "ഞങ്ങളുടെ ടീം", title: "ഞങ്ങളുടെ ജീവനക്കാര് എന്താണ് പറയുന്നത്", subtitle: "ഞങ്ങളുടെ മിഷൻ, മൂല്യങ്ങൾ, ശ്രേഷ്ഠതയോടുള്ള നിഷ്ഠയെക്കുറിച്ച് ലീഡർഷിപ്പ് ടീമിന്റെയും കേന്ദ്ര ജീവനക്കാരുടെയും അഭിപ്രായം കേൾക്കുക" }
});
translations.pa = mergeWithEn({
  firstTime: { title: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ", subtitle: "ਵੈੱਬਸਾਈਟ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ", continue: "ਜਾਰੀ ਰੱਖੋ" },
  nav: { home: "ਘਰ", products: "ਉਤਪਾਦ", clients: "ਗਾਹਕ", about: "ਸਾਡੇ ਬਾਰੇ", team: "ਸਾਡੀ ਟੀਮ", foreignCollaborations: "ਵਿਦੇਸ਼ੀ ਸਹਿਯੋਗ", investor: "ਨਿਵੇਸ਼ਕ ਸੰਬੰਧ", careers: "ਕੈਰੀਅਰ", contact: "ਸੰਪਰਕ ਕਰੋ" },
  hero: { title: "YNM ਮੈਗਾ ਇੰਡਸਟਰੀਜ਼", since: "2013 ਤੋਂ • ਨਿਰਮਾਣ ਅਤੇ ਨਿਰਯਾਤ ਉੱਤਮਤਾ", tagline1: "ਨਿਰਮਾਣ ਉੱਤਮਤਾ, ਵਿਸ਼ਵਵਿਆਪੀ ਪਹੁੰਚ", tagline2: "ਸੜਕ ਮਾਰਕਿੰਗ ਪੇਂਟ, ਫੈਬਰੀਕੇਸ਼ਨ ਅਤੇ ਫਰਨੀਚਰ", tagline3: "15+ ਦੇਸ਼ਾਂ ਵਿੱਚ ਗਾਹਕਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ", tagline4: "2013 ਤੋਂ ਗੁਣਵੱਤਾ ਨਿਰਮਾਣ", exploreProducts: "ਉਤਪਾਦ ਗੋਤਾਓ", yearsExperience: "ਸਾਲਾਂ ਦਾ ਤਜਰਬਾ", projectsDelivered: "ਪ੍ਰੋਜੈਕਟ ਪੂਰੇ", exportCountries: "ਨਿਰਯਾਤ ਦੇਸ਼", happyClients: "ਖੁਸ਼ ਗਾਹਕ" },
  common: { learnMore: "ਹੋਰ ਜਾਣੋ", viewAll: "ਸਭ ਦੇਖੋ", contactUs: "ਸੰਪਰਕ ਕਰੋ", getQuote: "ਕੋਟ ਲਵੋ", readMore: "ਹੋਰ ਪੜ੍ਹੋ", close: "ਬੰਦ", submit: "ਜਮ੍ਹਾਂ ਕਰੋ", cancel: "ਰੱਦ", noBrands: "ਕੋਈ ਬ੍ਰਾਂਡ ਉਪਲਬਧ ਨਹੀਂ" },
  footer: { about: "ਸਾਡੇ ਬਾਰੇ", quickLinks: "ਤੇਜ਼ ਲਿੰਕ", contact: "ਸੰਪਰਕ", followUs: "ਸਾਡੇ ਨਾਲ ਜੁੜੋ", terms: "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ", privacy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ", callNow: "ਹੁਣ ਕਾਲ ਕਰੋ", yourSafetyPartner: "ਤੁਹਾਡਾ ਸੁਰੱਖਿਆ ਸਾਥੀ!", createdBy: "ਬਣਾਇਆ", whatsAppComingSoon: "WhatsApp ਜਲਦ ਆ ਰਿਹਾ ਹੈ!", aboutText: "ਪ੍ਰੀਮੀਅਮ ਪੇਂਟ, ਧਾਤ ਨਿਰਮਾਣ ਅਤੇ ਸਕੂਲ ਫਰਨੀਚਰ ਦੇ ਪ੍ਰਮੁੱਖ ਨਿਰਮਾਤਾ ਅਤੇ ਨਿਰਯਾਤਕ। 2013 ਤੋਂ ਵਿਸ਼ਵ ਬਾਜ਼ਾਰਾਂ ਲਈ ਗੁਣਵੱਤਾ ਉਤਪਾਦ।" },
  products: { tag: "ਸਾਡੇ ਉਤਪਾਦ", title: "ਅਸੀਂ ਕੀ ਨਿਰਮਾਣ ਕਰਦੇ ਹਾਂ", description: "ਘਰੇ ਲੂੰ ਨਿਰਮਿਤ ਅਤੇ ਦੁਨੀਆ ਭਰ ਦੇ 15+ ਦੇਸ਼ਾਂ ਨੂੰ ਨਿਰਯਾਤ ਕੀਤੇ ਗੁਣਵੱਤਾਪੂਰਨ ਉਤਪਾਦ", explore: "ਗੋਤਾਓ", viewAll: "ਸਭ ਉਤਪਾਦ ਦੇਖੋ", paintsTitle: "ਪ੍ਰੀਮੀਅਮ ਪੇਂਟ", paintsDesc: "ਹਰ ਸਤਹ ਲਈ ਉੱਚ-ਗੁਣਵੱਤਾ ਵਾਲੀਆਂ ਉਦਯੋਗਿਕ ਅਤੇ ਸਜਾਵਟੀ ਪੇਂਟ।", fabricationTitle: "ਧਾਤ ਨਿਰਮਾਣ", fabricationDesc: "ਕਸਟਮ ਸਟੀਲ ਅਤੇ ਧਾਤ ਨਿਰਮਾਣ ਹੱਲ।", furnitureTitle: "ਸਕੂਲ ਫਰਨੀਚਰ", furnitureDesc: "ਵਿਦਿਅਕ ਸੰਸਥਾਵਾਂ ਲਈ ਅਰਗੋਨੋਮਿਕ ਅਤੇ ਟਿਕਾਊ ਫਰਨੀਚਰ।", safetyTitle: "ਸੁਰੱਖਿਆ ਉਪਕਰਣ", safetyDesc: "ਉਦਯੋਗਿਕ ਵਰਤੋਂ ਲਈ ਪ੍ਰੀਮੀਅਮ ਸੁਰੱਖਿਆ ਗਿਅਰ।" },
  usp: { tag: "ਸਾਡੇ ਬਾਰੇ", title: "YNM ਮੈਗਾ ਇੰਡਸਟਰੀਜ਼ ਬਾਰੇ", subtitle: "ਵਿਸ਼ਵ ਭਰ ਦੇ 15+ ਦੇਸ਼ਾਂ ਵਿੱਚ ਗਾਹਕਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ" },
  testimonials: { title: "ਪ੍ਰਸ਼ੰਸਾ", subtitle: "ਸਾਡੇ ਗਾਹਕ YNM ਮੈਗਾ ਇੰਡਸਟਰੀਜ਼ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ" },
  brands: { tag: "ਸਾਡੇ ਸਾਥੀ", title: "ਜਿਨ੍ਹਾਂ ਬ੍ਰਾਂਡਾਂ ਨਾਲ ਅਸੀਂ ਕੰਮ ਕਰਦੇ ਹਾਂ", description: "ਭਾਰਤ ਅਤੇ ਵਿਸ਼ਵ ਭਰ ਵਿੱਚ ਪ੍ਰਮੁੱਖ ਕੰਪਨੀਆਂ ਅਤੇ ਸੰਸਥਾਵਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ" },
  employees: { tag: "ਸਾਡੀ ਟੀਮ", title: "ਸਾਡੇ ਕਰਮਚਾਰੀ ਕੀ ਕਹਿੰਦੇ ਹਨ", subtitle: "ਸਾਡੇ ਮਿਸ਼ਨ, ਮੁੱਲ ਅਤੇ ਉੱਤਮਤਾ ਲਈ ਸਾਡੀ ਵਚਨਬੱਧਤਾ ਬਾਰੇ ਲੀਡਰਸ਼ਿਪ ਟੀਮ ਅਤੇ ਮੁੱਖ ਕਰਮਚਾਰੀਆਂ ਕੋਲੋਂ ਸੁਣੋ" }
});
translations.or = mergeWithEn({
  firstTime: { title: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ", subtitle: "ୱେବସାଇଟ୍ ବ୍ରାଉଜ୍ କରିବାକୁ ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ", continue: "ଜାରି ରଖନ୍ତୁ" },
  nav: { home: "ଘର", products: "ଉତ୍ପାଦ", clients: "ଗ୍ରାହକ", about: "ଆମ ବିଷୟରେ", team: "ଆମ ଦଳ", foreignCollaborations: "ବିଦେଶୀ ସହଯୋଗ", investor: "ନିବେଶକ ସମ୍ପର୍କ", careers: "କ୍ୟାରିଅର", contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ" },
  hero: { title: "YNM ମେଗା ଇଣ୍ଡଷ୍ଟ୍ରିଜ୍", since: "2013 ରୁ • ଉତ୍ପାଦନ ଏବଂ ରପ୍ତାନି ଉତ୍କୃଷ୍ଟତା", tagline1: "ଉତ୍ପାଦନ ଉତ୍କୃଷ୍ଟତା, ଜାତୀୟ ପହଞ୍ଚ", tagline2: "ରୋଡ୍ ମାର୍କିଂ ପେଣ୍ଟ୍, ଫ୍ୟାବ୍ରିକେସନ୍ ଏବଂ ଫର୍ନିଚର୍", tagline3: "15+ ଦେଶରେ ଗ୍ରାହକଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ", tagline4: "2013 ରୁ ଗୁଣବତ୍ତା ଉତ୍ପାଦନ", exploreProducts: "ଉତ୍ପାଦ ଅନ୍ୱେଷଣ କରନ୍ତୁ", yearsExperience: "ବର୍ଷର ଅଭିଜ୍ଞତା", projectsDelivered: "ପ୍ରୋଜେକ୍ଟ ସମ୍ପୂର୍ଣ୍ଣ", exportCountries: "ରପ୍ତାନି ଦେଶ", happyClients: "ସନ୍ତୁଷ୍ଟ ଗ୍ରାହକ" },
  common: { learnMore: "ଅଧିକ ଜାଣନ୍ତୁ", viewAll: "ସମସ୍ତ ଦେଖନ୍ତୁ", contactUs: "ଯୋଗାଯୋଗ କରନ୍ତୁ", getQuote: "କୋଟ୍ ନିଅନ୍ତୁ", readMore: "ଅଧିକ ପଢ଼ନ୍ତୁ", close: "ବନ୍ଦ", submit: "ଦାଖଲ କରନ୍ତୁ", cancel: "ବାତିଲ", noBrands: "କୌଣସି ବ୍ରାଣ୍ଡ ଉପଲବ୍ଧ ନାହିଁ" },
  footer: { about: "ଆମ ବିଷୟରେ", quickLinks: "ଦ୍ରୁତ ଲିଙ୍କ୍", contact: "ଯୋଗାଯୋଗ", followUs: "ଆମକୁ ଅନୁସରଣ କରନ୍ତୁ", terms: "ନିୟମ ଏବଂ ଶରତ", privacy: "ଗୋପନୀୟତା ନୀତି", callNow: "ବର୍ତ୍ତମାନ କଲ୍ କରନ୍ତୁ", yourSafetyPartner: "ଆପଣଙ୍କ ସୁରକ୍ଷା ସହଭାଗୀ!", createdBy: "ସୃଷ୍ଟି କରିଥିଲେ", whatsAppComingSoon: "WhatsApp ଶୀଘ୍ର ଆସୁଛି!", aboutText: "ପ୍ରିମିୟମ୍ ପେଣ୍ଟ୍, ମେଟାଲ୍ ଫ୍ୟାବ୍ରିକେସନ୍ ଏବଂ ସ୍କୁଲ୍ ଫର୍ନିଚର୍ ର ଅଗ୍ରଣୀ ଉତ୍ପାଦକ ଏବଂ ରପ୍ତାନିକାରୀ। 2013 ରୁ ଜାତୀୟ ବଜାରରେ ଗୁଣବତ୍ତା ଉତ୍ପାଦ।" },
  products: { tag: "ଆମ ଉତ୍ପାଦ", title: "ଆମେ କଣ ଉତ୍ପାଦନ କରୁ", description: "ଘରେ ଉତ୍ପାଦିତ ଏବଂ ବିଶ୍ୱବ୍ୟାପୀ 15+ ଦେଶକୁ ରପ୍ତାନି କରାଯାଇଥିବା ପ୍ରିମିୟମ୍ ଗୁଣବତ୍ତା ଉତ୍ପାଦ", explore: "ଅନ୍ୱେଷଣ କରନ୍ତୁ", viewAll: "ସମସ୍ତ ଉତ୍ପାଦ ଦେଖନ୍ତୁ", paintsTitle: "ପ୍ରିମିୟମ୍ ପେଣ୍ଟ୍", paintsDesc: "ପ୍ରତ୍ୟେକ ପୃଷ୍ଠଭୂମି ପାଇଁ ଉଚ୍ଚ-ଗୁଣବତ୍ତାର ଇଣ୍ଡଷ୍ଟ୍ରିଆଲ୍ ଏବଂ ଡେକୋରେଟିଭ୍ ପେଣ୍ଟ୍।", fabricationTitle: "ମେଟାଲ୍ ଫ୍ୟାବ୍ରିକେସନ୍", fabricationDesc: "କଷ୍ଟମ୍ ଷ୍ଟିଲ୍ ଏବଂ ମେଟାଲ୍ ଫ୍ୟାବ୍ରିକେସନ୍ ସମାଧାନ।", furnitureTitle: "ସ୍କୁଲ୍ ଫର୍ନିଚର୍", furnitureDesc: "ଶିକ୍ଷାନୁଷ୍ଠାନଙ୍କ ପାଇଁ ଏର୍ଗୋନୋମିକ୍ ଏବଂ ଟିକା ଫର୍ନିଚର୍।", safetyTitle: "ସୁରକ୍ଷା ଉପକରଣ", safetyDesc: "ଇଣ୍ଡଷ୍ଟ୍ରିଆଲ୍ ବ୍ୟବହାର ପାଇଁ ପ୍ରିମିୟମ୍ ସୁରକ୍ଷା ଗିଅର୍।" },
  usp: { tag: "ଆମ ବିଷୟରେ", title: "YNM ମେଗା ଇଣ୍ଡଷ୍ଟ୍ରିଜ୍ ବିଷୟରେ", subtitle: "ବିଶ୍ୱବ୍ୟାପୀ 15+ ଦେଶରେ ଗ୍ରାହକଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ" },
  testimonials: { title: "ପ୍ରଶଂସା", subtitle: "ଆମ ଗ୍ରାହକମାନେ YNM ମେଗା ଇଣ୍ଡଷ୍ଟ୍ରିଜ୍ ବିଷୟରେ କଣ କହନ୍ତି" },
  brands: { tag: "ଆମ ସହଭାଗୀ", title: "ଯେଉଁ ବ୍ରାଣ୍ଡଗୁଡିକ ସହିତ ଆମେ କାମ କରୁ", description: "ଭାରତ ଏବଂ ବିଶ୍ୱବ୍ୟାପୀ ଅଗ୍ରଣୀ କମ୍ପାନୀ ଏବଂ ସଂସ୍ଥାଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ" },
  employees: { tag: "ଆମ ଦଳ", title: "ଆମ କର୍ମଚାରୀମାନେ କଣ କହନ୍ତି", subtitle: "ଆମ ମିଶନ୍, ମୂଲ୍ୟବୋଧ ଏବଂ ଉତ୍କୃଷ୍ଟତା ପ୍ରତି ଆମ ପ୍ରତିବଦ୍ଧତା ବିଷୟରେ ନେତୃତ୍ୱ ଦଳ ଏବଂ ମୁଖ୍ୟ କର୍ମଚାରୀଙ୍କଠାରୁ ଶୁଣନ୍ତୁ" }
});
translations.ur = mergeWithEn({
  firstTime: { title: "اپنی زبان منتخب کریں", subtitle: "ویب سائٹ براؤز کرنے کے لیے اپنی پسندیدہ زبان منتخب کریں", continue: "جاری رکھیں" },
  nav: { home: "ہوم", products: "مصنوعات", clients: "کلائنٹس", about: "ہمارے بارے میں", team: "ہماری ٹیم", foreignCollaborations: "غیر ملکی تعاون", investor: "سرمایہ کار تعلقات", careers: "کیریئر", contact: "رابطہ کریں" },
  hero: { title: "YNM میگا انڈسٹریز", since: "2013 سے • مینوفیکچرنگ اور برآمدی فضیلت", tagline1: "مینوفیکچرنگ فضیلت، عالمی رسائی", tagline2: "سڑک مارکنگ پینٹس، فیبریکیشنز اور فرنیچر", tagline3: "15+ ممالک میں کلائنٹس کا اعتماد", tagline4: "2013 سے معیاری مینوفیکچرنگ", exploreProducts: "مصنوعات دریافت کریں", yearsExperience: "سالوں کا تجربہ", projectsDelivered: "پروجیکٹس مکمل", exportCountries: "برآمدی ممالک", happyClients: "خوش کلائنٹس" },
  common: { learnMore: "مزید جانیں", viewAll: "سب دیکھیں", contactUs: "رابطہ کریں", getQuote: "قیمت حاصل کریں", readMore: "مزید پڑھیں", close: "بند", submit: "جمع کروائیں", cancel: "منسوخ", noBrands: "برانڈز دستیاب نہیں" },
  footer: { about: "ہمارے بارے میں", quickLinks: "فوری لنکس", contact: "رابطہ", followUs: "ہمیں فالو کریں", terms: "شرائط و ضوابط", privacy: "رازداری کی پالیسی", callNow: "ابھی کال کریں", yourSafetyPartner: "آپ کا حفاظتی ساتھی!", createdBy: "بنایا", whatsAppComingSoon: "WhatsApp جلد آ رہا ہے!", aboutText: "پریمیم پینٹس، دھات کی فیبریکیشن اور اسکول فرنیچر کے سرکردہ مینوفیکچرر اور برآمدکنندہ۔ 2013 سے عالمی منڈیوں میں معیاری مصنوعات۔" },
  products: { tag: "ہماری مصنوعات", title: "ہم کیا تیار کرتے ہیں", description: "گھر میں تیار اور دنیا بھر کے 15+ ممالک کو برآمد کردہ پریمیم معیار کی مصنوعات", explore: "دریافت کریں", viewAll: "تمام مصنوعات دیکھیں", paintsTitle: "پریمیم پینٹس", paintsDesc: "ہر سطح کے لیے اعلیٰ معیار کے انڈسٹریل اور آرائشی پینٹس۔", fabricationTitle: "دھات کی فیبریکیشن", fabricationDesc: "حسب ضرورت سٹیل اور دھات کی فیبریکیشن حل۔", furnitureTitle: "اسکول فرنیچر", furnitureDesc: "تعلیمی اداروں کے لیے ارگونومک اور پائیدار فرنیچر۔", safetyTitle: "حفاظتی سامان", safetyDesc: "انڈسٹریل استعمال کے لیے پریمیم حفاظتی گیئر۔" },
  usp: { tag: "ہمارے بارے میں", title: "YNM میگا انڈسٹریز کے بارے میں", subtitle: "دنیا بھر کے 15+ ممالک میں کلائنٹس کا اعتماد" },
  testimonials: { title: "ساکھ", subtitle: "ہمارے کلائنٹس YNM میگا انڈسٹریز کے بارے میں کیا کہتے ہیں" },
  brands: { tag: "ہمارے ساتھی", title: "جن برانڈز کے ساتھ ہم کام کرتے ہیں", description: "بھارت اور عالمی سطح پر سرکردہ کمپنیوں اور اداروں کا اعتماد" },
  employees: { tag: "ہماری ٹیم", title: "ہمارے ملازمین کیا کہتے ہیں", subtitle: "ہمارے مشن، اقدار اور فضیلت کے لیے ہماری وابستگی کے بارے میں قیادت کی ٹیم اور کلیدی ملازمین سے سنیں" }
});
