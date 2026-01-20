"use client";

import { useState, useEffect, useRef } from "react";
import { faqData, productCatalog, contactLinks } from "@/lib/chatbotData";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Chatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({ name: "", email: "", phone: "" });
  const [messageReactions, setMessageReactions] = useState({});
  const [satisfactionRatings, setSatisfactionRatings] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatSessionId = useRef(`chat_${Date.now()}`);

  // Quick action options
  const quickActions = [
    { label: "Our Products", query: "What products do you manufacture?", action: null },
    { label: "Contact Info", query: "What is your contact information?", action: null },
    { label: "Get Quote", query: "How can I get a quote or pricing?", action: 'quote' },
    { label: "Export Services", query: "Which countries do you export to?", action: null },
    { label: "Certifications", query: "What certifications do you have?", action: null },
    { label: "Location", query: "Where is your office located?", action: null },
  ];

  // Load conversation history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem(`chatbot_messages_${chatSessionId.current}`);
      const initialMessage = {
        id: 1,
        text: "Hello! 👋 I'm your AI assistant powered by Google Gemini. I can help you with questions about YNM Mega Industries, our products, services, and more. How can I assist you today?",
        sender: "bot",
        timestamp: new Date()
      };
      
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          // Convert string timestamps back to Date objects
          const messagesWithDates = parsed.map(msg => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
          }));
          setMessages(messagesWithDates.length > 0 ? messagesWithDates : [initialMessage]);
        } catch {
          setMessages([initialMessage]);
        }
      } else {
        setMessages([initialMessage]);
      }
    }
  }, [language]);

  // Save conversation history to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem(`chatbot_messages_${chatSessionId.current}`, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  // Check FAQ for instant answers - only for exact matches
  const checkFAQ = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    for (const faq of faqData) {
      const faqLower = faq.question.toLowerCase().trim();
      // Only match if query is very similar to FAQ question (exact or very close match)
      if (lowerQuery === faqLower || 
          (lowerQuery.length > 10 && faqLower.includes(lowerQuery)) ||
          (faqLower.length > 10 && lowerQuery.includes(faqLower))) {
        return faq.answer;
      }
    }
    return null;
  };

  // Extract and format links in text
  const formatMessageWithLinks = (text) => {
    if (!text) return [{ type: 'text', content: text }];
    
    // Email pattern
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    // Phone pattern - more flexible
    const phonePattern = /(\+?91[\s-]?\d{5}[\s-]?\d{5})/g;
    // URL pattern
    const urlPattern = /(https?:\/\/[^\s]+)/gi;

    const parts = [];
    let lastIndex = 0;

    // Find all matches
    const matches = [];
    let match;
    
    // Email matches
    while ((match = emailPattern.exec(text)) !== null) {
      matches.push({ type: 'email', index: match.index, length: match[0].length, content: match[0] });
    }
    
    // Phone matches
    while ((match = phonePattern.exec(text)) !== null) {
      matches.push({ type: 'phone', index: match.index, length: match[0].length, content: match[0] });
    }
    
    // URL matches
    while ((match = urlPattern.exec(text)) !== null) {
      matches.push({ type: 'url', index: match.index, length: match[0].length, content: match[0] });
    }

    // Sort by index
    matches.sort((a, b) => a.index - b.index);

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      
      if (match.type === 'email') {
        parts.push({ 
          type: 'link', 
          content: match.content, 
          href: `mailto:${match.content}?subject=Inquiry from YNM Website`,
          target: '_self'
        });
      } else if (match.type === 'phone') {
        const phoneNum = match.content.replace(/\s+/g, '');
        parts.push({ 
          type: 'link', 
          content: match.content, 
          href: `tel:${phoneNum}`,
          target: '_self'
        });
      } else if (match.type === 'url') {
        parts.push({ 
          type: 'link', 
          content: match.content, 
          href: match.content,
          target: '_blank'
        });
      }
      
      lastIndex = match.index + match.length;
    });

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  // Generate follow-up questions based on response
  const generateFollowUpQuestions = (responseText) => {
    const lowerText = responseText.toLowerCase();
    const followUps = [];

    if (lowerText.includes('product')) {
      followUps.push("Tell me more about your paints");
      followUps.push("What about metal fabrication?");
      followUps.push("Show me school furniture options");
    }
    if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email')) {
      followUps.push("Can I visit your office?");
      followUps.push("What are your business hours?");
    }
    if (lowerText.includes('price') || lowerText.includes('quote') || lowerText.includes('cost')) {
      followUps.push("I need a quote for bulk order");
      followUps.push("Do you offer discounts?");
    }
    if (lowerText.includes('export')) {
      followUps.push("What documents are needed for export?");
      followUps.push("What is the minimum order quantity?");
    }

    return followUps.slice(0, 3); // Max 3 follow-ups
  };

  // Copy message to clipboard
  const copyMessage = (text, messageId) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show temporary feedback
      const copyBtn = document.querySelector(`[data-message-id="${messageId}"]`);
      if (copyBtn) {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied';
        setTimeout(() => {
          copyBtn.innerHTML = original;
        }, 2000);
      }
    });
  };

  // Handle message reaction
  const handleReaction = (messageId, reaction) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: reaction
    }));
  };

  // Handle satisfaction rating
  const handleRating = (messageId, rating) => {
    setSatisfactionRatings(prev => ({
      ...prev,
      [messageId]: rating
    }));
  };

  // Export chat transcript
  const exportChat = () => {
    const transcript = messages.map(msg => {
      const timestamp = msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp);
      const time = timestamp.toLocaleString();
      return `[${time}] ${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.text}`;
    }).join('\n\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ynm-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Start new conversation
  const startNewChat = () => {
    if (confirm('Start a new conversation? Current chat will be cleared.')) {
      chatSessionId.current = `chat_${Date.now()}`;
      const initialMessage = {
        id: 1,
        text: "Hello! 👋 I'm your AI assistant powered by Google Gemini. I can help you with questions about YNM Mega Industries, our products, services, and more. How can I assist you today?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      setShowQuickActions(true);
      localStorage.removeItem(`chatbot_messages_${chatSessionId.current}`);
    }
  };

  // Handle lead form submission
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send to contact API
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadFormData.name,
          email: leadFormData.email,
          phone: leadFormData.phone,
          subject: 'Quote Request from Chatbot',
          message: `Quote request from chatbot. User: ${leadFormData.name}, Email: ${leadFormData.email}, Phone: ${leadFormData.phone}`
        }),
      });

      if (response.ok) {
        const thankYouMessage = {
          id: Date.now(),
          text: `Thank you ${leadFormData.name}! We will contact you soon. You can also reach us at sales@ynmsafety.com or +91 96765 75770.`,
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, thankYouMessage]);
      }
    } catch (err) {
      console.error('Error submitting lead form:', err);
    }
    
    setShowLeadForm(false);
    setLeadFormData({ name: "", email: "", phone: "" });
  };

  // Handle quick action click
  const handleQuickAction = async (query, action = null) => {
    setShowQuickActions(false);
    
    // Handle special actions
    if (action === 'quote') {
      setShowLeadForm(true);
      return;
    }
    
    const userMessage = {
      id: Date.now(),
      text: query,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setError(null);
    
    try {
      // Skip FAQ check - let AI handle all responses for better answers
      // const faqAnswer = checkFAQ(query);
      // if (faqAnswer) {
      //   setTimeout(() => {
      //     const botMessage = {
      //       id: Date.now() + 1,
      //       text: faqAnswer,
      //       sender: "bot",
      //       timestamp: new Date()
      //     };
      //     setMessages(prev => [...prev, botMessage]);
      //     setShowQuickActions(true);
      //     setIsTyping(false);
      //   }, 500);
      //   return;
      // }

      const conversationHistory = messages
        .filter(msg => msg && msg.id !== 1 && msg.text && msg.sender)
        .slice(-10)
        .map(msg => ({
          sender: msg.sender,
          text: String(msg.text).trim()
        }))
        .filter(msg => msg.text.length > 0);

      const response = await fetch('/api/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query.trim(),
          conversationHistory: conversationHistory,
          language: language || 'en'
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || `API error: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!data || !data.response || typeof data.response !== 'string') {
        throw new Error('Invalid response from AI');
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
        followUpQuestions: generateFollowUpQuestions(data.response)
      };

      setMessages(prev => [...prev, botMessage]);
      setShowQuickActions(true);
    } catch (err) {
      console.error('Error getting AI response:', err);
      setError(err.message || 'Failed to get response. Please try again.');
      
      const errorMessage = {
        id: Date.now() + 1,
        text: `I'm sorry, I'm having trouble connecting right now. ${err.message ? `Error: ${err.message}. ` : ''}Please try again in a moment, or contact us directly at sales@ynmsafety.com or +91 96765 75770.`,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setShowQuickActions(true);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle sending message with Gemini API
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const messageToSend = inputValue.trim();

    const userMessage = {
      id: Date.now(),
      text: messageToSend,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = messageToSend;
    setInputValue("");
    setShowQuickActions(false);
    setIsTyping(true);
    setError(null);

    try {
      // Skip FAQ check - let AI handle all responses for better answers
      // const faqAnswer = checkFAQ(currentInput);
      // if (faqAnswer) {
      //   setTimeout(() => {
      //     const botMessage = {
      //       id: Date.now() + 1,
      //       text: faqAnswer,
      //       sender: "bot",
      //       timestamp: new Date(),
      //       followUpQuestions: generateFollowUpQuestions(faqAnswer)
      //     };
      //     setMessages(prev => [...prev, botMessage]);
      //     setShowQuickActions(true);
      //     setIsTyping(false);
      //   }, 500);
      //   return;
      // }

      const conversationHistory = messages
        .filter(msg => msg && msg.id !== 1 && msg.text && msg.sender)
        .slice(-10)
        .map(msg => ({
          sender: msg.sender,
          text: String(msg.text).trim()
        }))
        .filter(msg => msg.text.length > 0);

      const response = await fetch('/api/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput.trim(),
          conversationHistory: conversationHistory,
          language: language || 'en'
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || `API error: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!data || !data.response || typeof data.response !== 'string') {
        throw new Error('Invalid response from AI');
      }

      const botMessage = {
        id: Date.now(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
        followUpQuestions: generateFollowUpQuestions(data.response)
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Show lead form if user asks about quotes/pricing
      if (currentInput.toLowerCase().includes('quote') || 
          currentInput.toLowerCase().includes('price') || 
          currentInput.toLowerCase().includes('pricing') ||
          currentInput.toLowerCase().includes('cost')) {
        setTimeout(() => {
          setShowLeadForm(true);
        }, 1000);
      }
      
      setShowQuickActions(true);
    } catch (err) {
      console.error('Error getting AI response:', err);
      setError(err.message || 'Failed to get response. Please try again.');
      
      const errorMessage = {
        id: Date.now(),
        text: `I'm sorry, I'm having trouble connecting right now. ${err.message ? `Error: ${err.message}. ` : ''}Please try again in a moment, or contact us directly at sales@ynmsafety.com or +91 96765 75770.`,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setShowQuickActions(true);
    } finally {
      setIsTyping(false);
    }
  };

  // Toggle chat
  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  // Minimize chat
  const minimizeChat = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button - Right Side */}
      <button
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <div className="chatbot-toggle-icon">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
          )}
        </div>
        {!isOpen && !isMinimized && (
          <span className="chatbot-badge">💬</span>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && !isMinimized && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <h3>{t?.chatbot?.title || "YNM AI Assistant"}</h3>
                <p>{t?.chatbot?.subtitle || "Powered by Google Gemini"}</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button 
                className="chatbot-header-btn" 
                onClick={startNewChat}
                title={t?.chatbot?.newChat || "New Chat"}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
              <button 
                className="chatbot-header-btn" 
                onClick={exportChat}
                title={t?.chatbot?.exportChat || "Export Chat"}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
                </svg>
              </button>
            <button className="chatbot-minimize" onClick={minimizeChat} aria-label="Minimize">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => {
              const formattedContent = formatMessageWithLinks(message.text);
              const reactions = messageReactions[message.id];
              const rating = satisfactionRatings[message.id];
              
              return (
              <div key={message.id} className={`chatbot-message ${message.sender}`}>
                <div className="chatbot-message-content">
                    {formattedContent.map((part, i) => {
                      if (part.type === 'link') {
                        return (
                          <a
                            key={i}
                            href={part.href}
                            target={part.target}
                            rel={part.target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="chatbot-link"
                          >
                            {part.content}
                          </a>
                        );
                      }
                      // Handle line breaks in text
                      const textParts = part.content.split('\n');
                      return (
                        <span key={i}>
                          {textParts.map((line, lineIdx) => (
                            <span key={lineIdx}>
                              {line}
                              {lineIdx < textParts.length - 1 && <br />}
                            </span>
                          ))}
                        </span>
                      );
                    })}
                    
                    {/* Product cards if message mentions products */}
                    {message.text.toLowerCase().includes('product') && message.sender === 'bot' && (
                      <div className="chatbot-product-cards">
                        {Object.values(productCatalog).flat().slice(0, 3).map((product) => (
                          <div key={product.id} className="chatbot-product-card">
                            <div className="chatbot-product-card-image">
                              <Image src={product.image} alt={product.name} width={80} height={80} />
                            </div>
                            <div className="chatbot-product-card-info">
                              <h4>{product.name}</h4>
                              <p>{product.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Social media links if message mentions contact/social */}
                    {(message.text.toLowerCase().includes('contact') || message.text.toLowerCase().includes('social') || message.text.toLowerCase().includes('linkedin') || message.text.toLowerCase().includes('facebook')) && message.sender === 'bot' && (
                      <div className="chatbot-social-links">
                        <p style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>
                          Follow us:
                        </p>
                        <div className="chatbot-social-links-grid">
                          <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="chatbot-social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </a>
                          <a href={contactLinks.facebook} target="_blank" rel="noopener noreferrer" className="chatbot-social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                          </a>
                          <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="chatbot-social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                            </svg>
                            Instagram
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Message actions */}
                  <div className="chatbot-message-actions">
                    <button
                      className="chatbot-action-btn"
                      onClick={() => copyMessage(message.text, message.id)}
                      data-message-id={message.id}
                      title="Copy"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                    </button>
                    
                    {message.sender === 'bot' && (
                      <>
                        <button
                          className={`chatbot-action-btn ${reactions === 'helpful' ? 'active' : ''}`}
                          onClick={() => handleReaction(message.id, reactions === 'helpful' ? null : 'helpful')}
                          title="Helpful"
                        >
                          👍
                        </button>
                        <button
                          className={`chatbot-action-btn ${reactions === 'notHelpful' ? 'active' : ''}`}
                          onClick={() => handleReaction(message.id, reactions === 'notHelpful' ? null : 'notHelpful')}
                          title="Not Helpful"
                        >
                          👎
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Follow-up questions */}
                  {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                    <div className="chatbot-followup">
                      <p className="chatbot-followup-label">Follow-up questions:</p>
                      <div className="chatbot-followup-buttons">
                        {message.followUpQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            className="chatbot-followup-btn"
                            onClick={() => handleQuickAction(q)}
                          >
                            {q}
                          </button>
                  ))}
                </div>
                    </div>
                  )}
                  
                <span className="chatbot-message-time">
                    {(message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              );
            })}
            
            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-message-content">
                  <div className="chatbot-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Action Buttons */}
            {showQuickActions && !isTyping && messages.length > 0 && (
              <div className="chatbot-quick-actions">
                <p className="chatbot-quick-actions-label">{t?.chatbot?.quickQuestions || "Quick questions:"}</p>
                <div className="chatbot-quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="chatbot-quick-action-btn"
                      onClick={() => handleQuickAction(action.query, action.action)}
                      disabled={isTyping}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Lead Capture Form */}
            {showLeadForm && (
              <div className="chatbot-lead-form">
                <div className="chatbot-lead-form-header">
                  <h4>Get a Quote</h4>
                  <button 
                    className="chatbot-lead-form-close"
                    onClick={() => setShowLeadForm(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleLeadSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={leadFormData.name}
                    onChange={(e) => setLeadFormData({...leadFormData, name: e.target.value})}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={leadFormData.email}
                    onChange={(e) => setLeadFormData({...leadFormData, email: e.target.value})}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={leadFormData.phone}
                    onChange={(e) => setLeadFormData({...leadFormData, phone: e.target.value})}
                    required
                  />
                  <div className="chatbot-lead-form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowLeadForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Appointment Booking - Show when user asks about visiting/meeting */}
            {messages.some(m => m.text.toLowerCase().includes('visit') || m.text.toLowerCase().includes('meeting') || m.text.toLowerCase().includes('appointment')) && !showLeadForm && (
              <div className="chatbot-appointment-cta">
                <p>Want to schedule a visit?</p>
                <button 
                  className="chatbot-appointment-btn"
                  onClick={() => {
                    window.open(contactLinks.maps, '_blank');
                  }}
                >
                  View Our Location
                </button>
                <button 
                  className="chatbot-appointment-btn"
                  onClick={() => {
                    window.open(contactLinks.email, '_self');
                  }}
                >
                  Send Email
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder={t?.chatbot?.placeholder || "Type your question..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="chatbot-send" disabled={!inputValue.trim() || isTyping}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
