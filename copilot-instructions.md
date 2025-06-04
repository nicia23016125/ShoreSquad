# ShoreSquad Development Guide

This guide provides instructions for GitHub Copilot to assist in developing the ShoreSquad beach cleanup application.

## Project Overview

ShoreSquad is a Progressive Web App (PWA) that encourages and facilitates beach cleanup activities by connecting eco-conscious individuals and providing tools for organizing cleanup events.

## Unit Standards

### Measurement Units
All measurements in the application MUST use metric units:
- Temperature: Celsius (°C)
- Distance: kilometers (km) for long distances, meters (m) for shorter distances
- Speed: meters per second (m/s) for wind speed
- Weight/Mass: kilograms (kg) for waste collection
- Precipitation: millimeters (mm)
- Visibility: kilometers (km)

Example Usage:
```javascript
// Weather data
const weather = {
    temperature: 23, // °C
    windSpeed: 5.2, // m/s
    visibility: 10, // km
    precipitation: 2.5 // mm
};

// Distance calculations
const radius = 50; // km
const beachLength = 500; // m

// Impact tracking
const wasteCollected = 5280; // kg
```

### 1. Frontend Structure
- `index.html`: Main entry point, follows semantic HTML5
- `css/styles.css`: Uses CSS Grid and Flexbox for responsive layouts
- `js/app.js`: Core JavaScript functionality
- `sw.js`: Service Worker for PWA features
- `manifest.json`: PWA configuration

### 2. Color Palette
```css
--primary: #00A9A5    /* Turquoise - clean oceans */
--secondary: #FF7E54  /* Coral - energetic */
--accent: #FFD449     /* Sun Yellow - positive */
--background: #F0F7F7 /* Light Ocean - fresh */
--text: #2C3E50       /* Deep Blue - readable */
```

### 3. Development Guidelines

#### HTML
- Use semantic HTML5 elements
- Maintain ARIA labels for accessibility
- Keep mobile-first approach
- Include proper meta tags for SEO

#### CSS
- Follow BEM naming convention
- Maintain responsive breakpoints:
  ```css
  /* Mobile: < 768px (default) */
  /* Tablet: >= 768px */
  /* Desktop: >= 1024px */
  ```
- Use CSS variables for consistency

#### JavaScript
- Use ES6+ features
- Implement progressive enhancement
- Follow modular pattern for features
- Handle offline capabilities

## Feature Implementation Guide

### 1. Weather Integration
```javascript
// Weather API implementation should:
- Use geolocation API
- Cache weather data in localStorage
- Update every 30 minutes
- Include error handling for offline state
```

### 2. Maps Integration
```javascript
// Maps feature should:
- Show cleanup events within 50km radius
- Allow adding new cleanup locations
- Include clustering for multiple events
- Support offline map caching
```

### 3. Squad Management
```javascript
// Squad features should:
- Handle user authentication
- Support group creation/joining
- Include activity tracking
- Enable social sharing
```

## Testing Considerations

1. **PWA Features**
   - Verify offline functionality
   - Test installation process
   - Check push notifications

2. **Responsive Design**
   - Test on multiple devices
   - Verify touch interactions
   - Ensure accessible navigation

3. **Performance**
   - Maintain Lighthouse score > 90
   - Optimize image loading
   - Monitor JavaScript bundles

## Error Handling

```javascript
// Example error handling pattern
try {
  // Feature implementation
} catch (error) {
  // 1. Log error
  console.error('Feature error:', error);
  
  // 2. Show user-friendly message
  showNotification({
    type: 'error',
    message: 'Something went wrong. Please try again.',
    retry: true
  });
  
  // 3. Handle offline state
  if (!navigator.onLine) {
    initializeOfflineMode();
  }
}
```

## Performance Optimization

1. **Image Optimization**
   - Use WebP format with fallbacks
   - Implement lazy loading
   - Maintain appropriate sizes

2. **Caching Strategy**
   ```javascript
   // Service Worker caching priorities:
   1. Core app shell
   2. Offline functionality
   3. Dynamic data
   ```

3. **Bundle Optimization**
   - Split code by routes
   - Minimize third-party dependencies
   - Use tree shaking

## Security Guidelines

1. **Data Protection**
   - Sanitize user inputs
   - Use HTTPS only
   - Implement CSP headers

2. **API Security**
   - Use token-based authentication
   - Rate limit requests
   - Validate all data

## Accessibility Requirements

- Maintain WCAG 2.1 AA compliance
- Support keyboard navigation
- Provide alternative text for images
- Ensure sufficient color contrast
- Support screen readers

## Documentation Standards

1. **Code Comments**
   - Document complex logic
   - Explain business rules
   - Note performance considerations

2. **API Documentation**
   - Document all endpoints
   - Include request/response examples
   - Note rate limits

3. **Component Documentation**
   - Document props/parameters
   - Include usage examples
   - Note dependencies

## Version Control

- Use semantic versioning
- Follow conventional commits
- Keep feature branches focused
- Regular rebase with main

## Contribution Workflow

1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Create pull request

---

Note: This guide should be updated as new features and requirements are added to the project.
