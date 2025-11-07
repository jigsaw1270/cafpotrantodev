# 💳 Nexi Pay Integration Documentation

## 📋 Project Overview

**CafPotranto** - Professional CAF (Centro di Assistenza Fiscale) and legal services provider integrating with **Nexi XPay** payment gateway for secure payment processing.

**Website**: https://cafpotranto.dev  
**Business Type**: Professional Legal/Administrative Services  
**Location**: Milan, Italy  
**Integration Date**: November 2025

---

## 🎯 Business Requirements

### **Core Services Requiring Payment Integration**

- **CAF Services**: Tax declarations (730, UNICO), ISEE calculations
- **Patronato Services**: Pension applications, NASpI unemployment benefits
- **Digital Identity**: SPID registration and assistance
- **Immigration Services**: Permit renewals, citizenship applications
- **Legal Consultation**: Administrative law, document processing

### **Payment Scenarios**

```typescript
interface PaymentScenarios {
  consultationFees: '€25-150'; // One-time professional consultations
  documentProcessing: '€15-75'; // Document preparation and filing
  annualServices: '€100-500'; // Yearly service packages
  urgentServices: '€50-200'; // Expedited processing
  spidRegistration: '€25'; // Digital identity setup
}
```

---

## 🔧 Technical Integration Plan

### **Selected Integration Method: Hosted Payment Page (HPP)**

**Decision Rationale:**
✅ **PCI Compliance**: Zero liability for sensitive card data  
✅ **Quick Implementation**: 2-3 days development time  
✅ **Legal Safety**: Reduces payment liability for professional services  
✅ **Multi-payment Support**: Cards, wallets, bank transfers  
✅ **Professional Trust**: Bank-grade security enhances credibility

### **Alternative Methods Considered**

- **Server-to-Server (S2S)**: Rejected due to PCI compliance complexity
- **JavaScript SDK**: Rejected due to mobile compatibility concerns

---

## 💳 Supported Payment Methods

### **Primary Methods**

- **Credit/Debit Cards**: Visa, Mastercard, American Express, Maestro
- **Digital Wallets**: PayPal, Apple Pay, Google Pay, Samsung Pay
- **Italian Payments**: PostePay, Satispay, MyBank, Bancomat Pay
- **Bank Transfers**: SEPA Direct Debit, Online banking

### **Payment Flow Coverage**

```typescript
const clientDemographics = {
  youngProfessionals: ['Apple Pay', 'Google Pay', 'Satispay'],
  middleAged: ['Credit Cards', 'PayPal', 'Bank Transfer'],
  seniors: ['Bancomat', 'PostePay', 'Traditional methods'],
  businesses: ['SEPA', 'Bank Transfer', 'Corporate Cards'],
};
```

---

## 🏗️ Implementation Architecture

### **Phase 1: Core Payment Service (Week 1)**

```typescript
// src/lib/nexi-payment.ts
interface NexiCredentials {
  merchantId: string; // Merchant identifier
  secretKey: string; // MAC calculation key
  terminalId: string; // Terminal identifier
  environment: 'test' | 'production';
}

interface PaymentRequest {
  amount: number; // In cents (€10.00 = 1000)
  currency: 'EUR';
  orderNumber: string; // Unique transaction ID
  description: string; // Service description
  customerEmail: string; // Client email
  returnUrl: string; // Success redirect
  errorUrl: string; // Failure redirect
}
```

### **Phase 2: Service Integration (Week 2)**

```typescript
// src/components/payment/service-payment-form.tsx
// - Service selection component
// - Price calculation logic
// - Payment form UI with CafPotranto branding
// - Integration with Nexi HPP
```

### **Phase 3: API Implementation (Week 2)**

```typescript
// src/app/api/payments/create/route.ts
// - Payment creation endpoint
// - MAC signature generation
// - Order management
// - Database integration

// src/app/api/payments/callback/route.ts
// - Payment result handling
// - Order status updates
// - Email notifications
// - Service delivery triggers
```

### **Phase 4: UI Components (Week 3)**

```typescript
// Payment-related components:
// - ServicePaymentForm: Main payment interface
// - PaymentSuccessPage: Confirmation and next steps
// - PaymentErrorPage: Error handling and retry options
// - PaymentStatusChecker: Real-time status updates
```

---

## 🔐 Security & Compliance

### **Environment Variables Required**

```env
# .env.local
NEXI_MERCHANT_ID=your_merchant_id
NEXI_SECRET_KEY=your_secret_key
NEXI_TERMINAL_ID=your_terminal_id
NEXI_ENVIRONMENT=test|production
NEXT_PUBLIC_BASE_URL=https://cafpotranto.dev
```

### **Security Measures**

- **MAC Signature**: SHA1 hash for transaction verification
- **HTTPS Only**: All payment communications encrypted
- **No Card Storage**: Nexi handles all sensitive data
- **Webhook Validation**: Verify payment notifications
- **Order Tracking**: Prevent duplicate transactions

---

## 📧 Nexi Communication History

### **Initial Inquiry Response (November 2025)**

```
Issue: Nexi requested clarification on e-commerce vs service-based business model
Solution: Clarified CAF/legal services business, requested PayByLink service
Status: Awaiting Nexi response with technical documentation
```

### **Business Clarification Sent**

- Explained professional CAF services (not e-commerce)
- Confirmed interest in PayByLink service
- Requested technical documentation and credentials
- Provided business registration details

### **Required Documentation for Nexi**

- [x] Business registration (Partita IVA)
- [x] CAF authorization certificates
- [x] Service portfolio description
- [ ] Professional liability insurance
- [ ] Client references (if requested)

---

## 🚀 Development Roadmap

### **Immediate Next Steps**

1. **Await Nexi Response**: Technical documentation and credentials
2. **Setup Development Environment**: Test merchant account
3. **Create Basic Payment Service**: Core integration logic
4. **Build UI Components**: Payment forms with CafPotranto branding
5. **Testing Phase**: Validate all payment scenarios
6. **Production Deployment**: Go-live with real credentials

### **Timeline Estimate**

```
Week 1: Nexi setup + Core payment service
Week 2: API routes + Service integration
Week 3: UI components + Testing
Week 4: Production deployment + Monitoring
```

---

## 💼 Business Impact

### **Revenue Enablement**

- **Digital Payment Processing**: Accept online payments for all services
- **Reduced Payment Friction**: Multiple payment options increase conversion
- **Professional Positioning**: Secure payment processing enhances trust
- **Scalability**: Handle growth without payment infrastructure changes

### **Operational Benefits**

- **Automated Payment Tracking**: Real-time payment confirmations
- **Reduced Manual Processing**: Automated invoice generation
- **Better Cash Flow**: Immediate payment processing
- **Client Convenience**: 24/7 payment availability

---

## 📊 Success Metrics

### **Payment Conversion Targets**

```typescript
const successMetrics = {
  conversionRate: '>90%', // Payment completion rate
  averageTransactionTime: '<3min', // User payment time
  paymentMethodUsage: {
    creditCards: '60%',
    digitalWallets: '25%',
    bankTransfers: '10%',
    italian_methods: '5%',
  },
  customerSatisfaction: '>95%', // Payment experience rating
};
```

### **Technical Performance**

- **Payment Processing**: <5 second response time
- **Uptime**: 99.9% availability
- **Error Rate**: <0.1% failed transactions
- **Security**: Zero payment data breaches

---

## 🔗 Integration Resources

### **Nexi Documentation**

- **Developer Portal**: https://developer.nexigroup.com/xpaycee/en-EU/docs/
- **HPP Integration**: https://developer.nexigroup.com/xpaycee/en-EU/docs/integration-options/
- **PayByLink Service**: [Awaiting documentation from Nexi]

### **Technical References**

- **MAC Calculation**: SHA1(codTrans + divisa + importo + secret)
- **Test Environment**: https://ecommerce.nexi.it/ecomm/ecomm/DispatcherServlet
- **Production URL**: [To be provided by Nexi]

---

## 📋 Action Items

### **Pending Tasks**

- [ ] Receive Nexi test credentials
- [ ] Setup development environment
- [ ] Implement core payment service
- [ ] Create payment UI components
- [ ] Setup webhook handling
- [ ] Comprehensive testing
- [ ] Production deployment

### **Dependencies**

- **Nexi Account Approval**: Required for all development
- **Technical Documentation**: API specifications and examples
- **Test Credentials**: Merchant ID, secret key, terminal ID
- **Business Verification**: CAF licensing confirmation

---

## 👥 Team & Contacts

### **Development Team**

- **Technical Lead**: [Name]
- **Frontend Developer**: [Name]
- **Backend Developer**: [Name]
- **QA Tester**: [Name]

### **Business Contacts**

- **Nexi Support**: [To be provided]
- **Business Account Manager**: [To be assigned]
- **Technical Support**: [Emergency contact]

---

**Document Created**: November 6, 2025  
**Last Updated**: November 6, 2025  
**Status**: Awaiting Nexi Response  
**Next Review**: Upon Nexi documentation receipt

---

_This document serves as the central reference for all Nexi payment integration activities for the CafPotranto project._
