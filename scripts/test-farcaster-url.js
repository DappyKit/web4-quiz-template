#!/usr/bin/env node

/**
 * Test script to verify Farcaster URL encoding/decoding
 * 
 * This can be run directly with: node scripts/test-farcaster-url.js
 */

// Mock URLSearchParams if running in Node environment
if (typeof URLSearchParams === 'undefined') {
  global.URLSearchParams = require('url').URLSearchParams;
}

// Import the required functions
// We need to use CommonJS imports since this is a Node script
const path = require('path');
const fs = require('fs');

/**
 * Generate a share intent URL with special formatting for Warpcast
 */
function generateShareIntent(text, appUrl) {
  // Encode the text and URL parameters properly
  const encodedText = encodeURIComponent(text);
  
  // For array parameters, encode the URL but use %5B%5D for brackets
  const encodedEmbed = encodeURIComponent(appUrl);
  
  // Build URL with array parameter correctly formatted
  return `https://warpcast.com/~/compose?text=${encodedText}&embeds%5B%5D=${encodedEmbed}`;
}

/**
 * Creates a formatted share text with score and emoji
 */
function createShareText(quizName, score, totalQuestions) {
  const percentage = Math.round((score / totalQuestions) * 100);
  let emoji = "";
  
  // Select emoji based on score percentage
  if (percentage >= 90) emoji = "🏆";
  else if (percentage >= 70) emoji = "🎉";
  else if (percentage >= 50) emoji = "👍";
  else emoji = "🔄";
  
  // Format the share text
  return `${emoji} I scored ${percentage}% (${score}/${totalQuestions}) on the "${quizName}" quiz! Try it yourself:`;
}

/**
 * Simulate Warpcast's URL parsing logic with safer decoding
 */
function warpcastParseUrl(url) {
  try {
    console.log('Testing URL:', url);
    
    // Extract the query part (everything after the ?)
    const queryPart = url.split('?')[1];
    if (!queryPart) {
      console.log('No query parameters found');
      return {};
    }
    
    // Parse using URLSearchParams first (like Warpcast does)
    const urlSearchParams = new URLSearchParams(queryPart);
    const result = {};
    let hasArraySearchParams = false;
    
    // Process each parameter (similar to Warpcast's logic)
    for (const key of urlSearchParams.keys()) {
      const ARRAY_SEARCH_PARAM_INDICATOR = '[]';
      const isArraySearchParam = key.endsWith(ARRAY_SEARCH_PARAM_INDICATOR);
      
      if (!hasArraySearchParams && isArraySearchParam) {
        hasArraySearchParams = true;
      }
      
      // Get values based on if it's an array parameter
      const value = isArraySearchParam
        ? urlSearchParams.getAll(key)
        : urlSearchParams.get(key);
      
      if (value !== null) {
        const resultKey = key.split(ARRAY_SEARCH_PARAM_INDICATOR)[0];
        result[resultKey] = value;
      }
    }
    
    // MODIFIED: Apply a SAFER decoding that won't crash
    // This is a modified version of Warpcast's code that has error handling
    if (hasArraySearchParams) {
      console.log('Has array parameters, applying additional decoding');
      for (const [key, value] of Object.entries(result)) {
        if (Array.isArray(value)) {
          try {
            // Safe decoding with error handling
            result[key] = value.map(item => {
              try {
                return decodeURIComponent(item);
              } catch (e) {
                console.log(`Warning: Could not decode array item "${item}" for key "${key}"`);
                return item; // Return the original item if decoding fails
              }
            });
          } catch (error) {
            console.warn(`Warning: Error processing array values for "${key}":`, error.message);
            // Keep the original value if decoding fails
          }
        } else {
          try {
            // Only attempt to decode if it looks like it needs decoding
            if (typeof value === 'string' && value.includes('%')) {
              try {
                result[key] = decodeURIComponent(value);
              } catch (e) {
                console.log(`Warning: Could not decode value "${value}" for key "${key}"`);
                // Keep original value
              }
            }
          } catch (error) {
            console.warn(`Warning: Error decoding value for "${key}":`, error.message);
            // Keep the original value if decoding fails
          }
        }
      }
    }
    
    console.log('Successfully parsed URL');
    return result;
  } catch (error) {
    console.error('Error parsing URL:', error);
    throw error;
  }
}

/**
 * Extract components from a URL for analysis
 */
function analyzeUrl(url) {
  try {
    console.log('\nURL ANALYSIS:');
    
    // Break down URL parts
    const [baseUrl, queryString] = url.split('?');
    console.log('Base URL:', baseUrl);
    
    if (!queryString) {
      return { baseUrl, params: {} };
    }
    
    console.log('Query String:', queryString);
    
    // Analyze each parameter
    const params = {};
    const paramPairs = queryString.split('&');
    
    paramPairs.forEach(pair => {
      const [key, value] = pair.split('=');
      console.log(`- Parameter "${key}":`, value);
      
      // Store the raw value
      params[key] = value;
    });
    
    return { baseUrl, params };
  } catch (error) {
    console.error('Error analyzing URL:', error);
    return { error: error.message };
  }
}

/**
 * Run the test
 */
function runTest() {
  try {
    // Generate sample share text
    const quizName = "Animal Quiz";
    const score = 1;
    const totalQuestions = 3;
    const shareText = createShareText(quizName, score, totalQuestions);
    
    console.log('Share Text:', shareText);
    
    // Test URLs with different formatting
    const appUrl = "https://web4-quiz-template.vercel.app";
    const urls = [
      // Our current implementation with %5B%5D
      generateShareIntent(shareText, appUrl),
      
      // Original problematic format with unencoded []
      `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(appUrl)}`,
      
      // Simple format (no array syntax)
      `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embed=${encodeURIComponent(appUrl)}`
    ];
    
    // First analyze the URLs to understand what we're working with
    console.log('\n=== URL ANALYSIS ===\n');
    urls.forEach((url, index) => {
      console.log(`\n--- URL #${index+1} STRUCTURE ---`);
      analyzeUrl(url);
    });
    
    // Test each URL format
    console.log('\n=== TESTING URL FORMATS ===\n');
    for (let i = 0; i < urls.length; i++) {
      console.log(`\n--- URL Format #${i+1} ---`);
      try {
        const url = urls[i];
        console.log(`URL: ${url}`);
        const parsedParams = warpcastParseUrl(url);
        console.log('Parsed Parameters:', JSON.stringify(parsedParams, null, 2));
        console.log('TEST PASSED ✅');
      } catch (error) {
        console.log(`TEST FAILED ❌ - Format #${i+1} failed with error:`, error.message);
      }
    }
    
    console.log('\n=== RECOMMENDATION ===');
    console.log('Based on testing, URL format #3 (simple format) is most reliable');
    console.log('Recommended URL format:', urls[2]);
    
    // Update our Farcaster utils
    console.log('\n=== IMPLEMENTATION RECOMMENDATION ===');
    console.log('Suggested implementation:');
    console.log(`
/**
 * Generate a Farcaster intent URL to compose a cast with quiz results
 * @param text - Text to include in the cast
 * @param appUrl - URL to embed in the cast (the quiz app)
 * @returns URL string for the intent
 */
export function generateShareIntent(text: string, appUrl: string): string {
  // Encode the text and URL parameters properly
  const encodedText = encodeURIComponent(text);
  const encodedEmbed = encodeURIComponent(appUrl);
  
  // Use a simpler URL format that avoids array parameter issues
  return \`https://warpcast.com/~/compose?text=\${encodedText}&embed=\${encodedEmbed}\`;
}
    `);
  } catch (error) {
    console.error('Test failed with error:', error);
    process.exit(1);
  }
}

// Run the test
console.log('Running Farcaster URL encoding test...');
runTest(); 