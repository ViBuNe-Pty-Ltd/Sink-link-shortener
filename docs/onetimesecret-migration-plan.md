# OneTimeSecret Migration Plan

## Overview

This document outlines the plan to transform Sink from a link shortening service to a OneTimeSecret-like application for secure, temporary secret sharing.

## Current State Analysis

### Sink Application (Current)
- **Purpose**: Link shortening with analytics
- **Data Model**: Links with URLs, slugs, expiration, metadata
- **Storage**: Cloudflare KV with expiration support
- **Authentication**: Site token-based dashboard access
- **Features**: Analytics, QR codes, AI slug generation

### OneTimeSecret Workflow (Target)
- **Purpose**: Temporary secret sharing
- **Core Concept**: 
  1. User creates a secret (password, API key, etc.)
  2. System generates a unique URL
  3. Secret is stored with expiration
  4. Recipient accesses URL to view secret **once**
  5. Secret is **automatically deleted** after first view

## Feasibility Assessment

✅ **HIGHLY FEASIBLE**

The transformation is feasible due to:
- Existing Cloudflare KV infrastructure
- Proven Nuxt/Vue.js frontend
- Existing authentication system
- Good UI component library
- Similar data patterns (slug-based access)

## Implementation Plan

### Phase 1: Core Infrastructure Changes

#### 1.1 Data Model Evolution

**Current**: `LinkSchema` with URL redirection
**New**: `SecretSchema` with one-time access

```typescript
// New Secret Schema
export const SecretSchema = z.object({
  id: z.string().trim().max(26).default(nanoid(10)),
  content: z.string().trim().max(10000), // The actual secret
  slug: z.string().trim().max(2048).regex(new RegExp(slugRegex)).default(nanoid()),
  comment: z.string().trim().max(2048).optional(),
  createdAt: z.number().int().safe().default(() => Math.floor(Date.now() / 1000)),
  updatedAt: z.number().int().safe().default(() => Math.floor(Date.now() / 1000)),
  expiration: z.number().int().safe().optional(),
  maxViews: z.number().int().min(1).default(1), // One-time by default
  currentViews: z.number().int().min(0).default(0),
  isDestroyed: z.boolean().default(false),
})
```

#### 1.2 Storage Strategy
- **KV Key Pattern**: `secret:${slug}` instead of `link:${slug}`
- **Auto-deletion**: Implement view counting and deletion logic
- **Expiration**: Leverage existing KV expiration + application-level cleanup

#### 1.3 API Endpoints Restructure
```
Current: /api/link/* → New: /api/secret/*
- POST /api/secret/create    # Create new secret
- GET  /api/secret/view/:slug # View secret (destructive)
- GET  /api/secret/status/:slug # Check if secret exists
- DELETE /api/secret/delete   # Manual deletion
```

### Phase 2: Frontend Transformation

#### 2.1 New User Flow
1. **Create Secret Page**: Simple form with content, optional expiration
2. **Secret View Page**: Display secret content with copy functionality
3. **Dashboard**: Track created secrets (optional, for authenticated users)

#### 2.2 UI Components
- **Secret Creator**: Textarea for secret content + expiration options
- **Secret Viewer**: Secure display with copy-to-clipboard
- **Status Checker**: Verify if secret exists before sharing

### Phase 3: Security Enhancements

#### 3.1 One-Time Access Logic
```typescript
// Pseudo-code for view endpoint
async function viewSecret(slug: string) {
  const secret = await KV.get(`secret:${slug}`)
  if (!secret || secret.isDestroyed) {
    return { error: 'Secret not found or already viewed' }
  }
  
  // Increment view count
  secret.currentViews++
  secret.isDestroyed = secret.currentViews >= secret.maxViews
  
  if (secret.isDestroyed) {
    await KV.delete(`secret:${slug}`) // Immediate deletion
  } else {
    await KV.put(`secret:${slug}`, JSON.stringify(secret))
  }
  
  return { content: secret.content }
}
```

#### 3.2 Additional Security Features
- **Rate Limiting**: Prevent abuse
- **Content Encryption**: Optional client-side encryption
- **Burn-on-read**: Immediate deletion after view
- **No-logging**: Don't store access logs for secrets

### Phase 4: Optional Features

#### 4.1 Enhanced Functionality
- **Multi-view secrets**: Allow multiple views before deletion
- **Password protection**: Optional password for secret access
- **Self-destruct timers**: Automatic deletion after time period
- **Share tracking**: Optional analytics for authenticated users

#### 4.2 Migration Strategy
- **Dual Mode**: Support both link shortening AND secret sharing
- **Gradual Migration**: Add secret features alongside existing link features
- **Backward Compatibility**: Keep existing link functionality intact

## Implementation Complexity Assessment

### ✅ Easy to Implement
- Data model changes (similar to existing LinkSchema)
- KV storage (already implemented)
- Basic CRUD operations (existing patterns)
- Frontend forms (existing UI components)

### ⚠️ Medium Complexity
- One-time access logic (new business logic)
- Security considerations (rate limiting, encryption)
- UI/UX for secret creation/viewing

### 🔴 Higher Complexity
- Dual-mode operation (if keeping both features)
- Advanced security features (client-side encryption)
- Analytics integration (privacy concerns)

## Recommended Implementation Approaches

### Option A: Complete Transformation (Recommended)
- Convert entirely to OneTimeSecret functionality
- Remove link shortening features
- Focus on security and simplicity
- **Timeline**: 2-3 weeks

### Option B: Dual-Mode Application
- Add secret sharing alongside link shortening
- Toggle between modes via configuration
- More complex but preserves existing functionality
- **Timeline**: 4-6 weeks

### Option C: Gradual Migration
- Start with secret sharing as additional feature
- Gradually deprecate link shortening
- Allows for user feedback and iteration
- **Timeline**: 3-4 weeks

## Technical Considerations

### ✅ Advantages
- Existing Cloudflare KV infrastructure
- Proven Nuxt/Vue.js frontend
- Existing authentication system
- Good UI component library

### ⚠️ Challenges
- Security implementation (rate limiting, encryption)
- Privacy considerations (no logging vs analytics)
- User experience for one-time access
- Migration of existing data

## Detailed Implementation Steps

### Step 1: Create New Schema
1. Create `schemas/secret.ts` with SecretSchema
2. Update validation patterns
3. Add new utility functions for secret generation

### Step 2: Implement API Endpoints
1. Create `/server/api/secret/` directory
2. Implement CRUD operations
3. Add one-time access logic
4. Implement security measures

### Step 3: Frontend Components
1. Create secret creation form
2. Implement secret viewing page
3. Add copy-to-clipboard functionality
4. Create status checking components

### Step 4: Security Implementation
1. Add rate limiting middleware
2. Implement optional encryption
3. Add access logging (optional)
4. Implement automatic cleanup

### Step 5: Testing & Deployment
1. Unit tests for new functionality
2. Integration tests for API endpoints
3. Security testing
4. Deployment to Cloudflare

## Configuration Changes

### Environment Variables
```bash
# New variables for secret sharing
NUXT_SECRET_MAX_CONTENT_LENGTH=10000
NUXT_SECRET_DEFAULT_EXPIRATION=3600
NUXT_SECRET_RATE_LIMIT=10
NUXT_SECRET_ENABLE_ENCRYPTION=false
```

### App Configuration
```typescript
// app.config.ts additions
export default defineAppConfig({
  // ... existing config
  secretSharing: {
    maxContentLength: 10000,
    defaultExpiration: 3600,
    rateLimit: 10,
    enableEncryption: false,
  },
})
```

## Migration Checklist

### Phase 1: Foundation
- [ ] Create SecretSchema
- [ ] Implement basic API endpoints
- [ ] Create frontend forms
- [ ] Add basic security

### Phase 2: Core Features
- [ ] Implement one-time access logic
- [ ] Add secret viewing page
- [ ] Implement copy functionality
- [ ] Add expiration handling

### Phase 3: Security & Polish
- [ ] Add rate limiting
- [ ] Implement encryption (optional)
- [ ] Add comprehensive testing
- [ ] Performance optimization

### Phase 4: Deployment
- [ ] Update documentation
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Monitor and iterate

## Future Considerations

### Potential Enhancements
- **Client-side encryption**: End-to-end encryption
- **Advanced analytics**: Usage patterns (privacy-focused)
- **API integration**: Programmatic secret creation
- **Mobile app**: Native mobile experience

### Scalability Considerations
- **Global distribution**: Leverage Cloudflare's edge network
- **Storage optimization**: Efficient KV usage
- **Performance monitoring**: Track response times
- **Cost optimization**: Monitor Cloudflare usage

## Conclusion

The transformation from Sink to a OneTimeSecret-like application is highly feasible and can be completed within 2-4 weeks depending on the chosen approach. The existing infrastructure provides a solid foundation, and the new functionality will offer users a secure, simple way to share temporary secrets.

The recommended approach is **Option A (Complete Transformation)** for its simplicity and focus on the core OneTimeSecret functionality.
