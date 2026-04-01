# Digital Evidence Vault

## Project Description
Digital Evidence Vault is a role-based digital evidence management system that ensures the integrity of digital evidence using SHA-256 hashing and maintains a chain of custody log for tracking all actions performed on evidence.

## Features
- Role-Based Login System (Admin, Police, Forensic, Evidence Room)
- Upload Digital Evidence
- SHA-256 Hash Generation
- Evidence Integrity Verification
- Tamper Detection
- Chain of Custody Logs
- Admin Dashboard
- Evidence Management System

## Technologies Used
- React.js
- CSS / Tailwind CSS
- LocalStorage
- Crypto-JS (SHA-256)
- React Router

## System Modules
1. Admin Dashboard
2. Police Dashboard
3. Upload Evidence Module
4. Verify Evidence Module
5. Evidence List Module
6. Chain of Custody Logs

## How the System Works
1. Police upload digital evidence.
2. System generates SHA-256 hash for the file.
3. Evidence is stored in the system.
4. Forensic department verifies evidence by comparing hash values.
5. If hash matches → Evidence is Verified.
6. If hash does not match → Evidence is Tampered.
7. All actions are recorded in Chain of Custody Logs.

## How to Run the Project
```bash
npm install
npm run dev