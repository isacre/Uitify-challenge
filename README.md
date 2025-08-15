# Mini Seller Console

A lightweight React-based console application for managing leads and converting them into opportunities. Built with modern web technologies and designed for efficient sales team workflows.

## 🎯 Project Overview

**Goal**: Build a lightweight console to triage Leads and convert them into Opportunities. You can use an AI co-pilot, we encourage dev's to do so, but what we are assessing on is the structure and quality.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## ✨ Features

### **1. Leads Management**

- [x] Load leads from a local JSON file
- [x] Include fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`
- [x] Implement **search** by name/company
- [x] Implement **filter** by status
- [x] Implement **sort** by score (descending)

### **2. Lead Detail Panel**

- [x] Click a row to open a **slide-over panel**
- [x] Allow **inline edit** for `status` and `email`
- [x] Validate email format before saving
- [x] Add **save** and **cancel** actions
- [x] Implement basic error handling on save

### **3. Opportunity Conversion**

- [x] Add a **Convert Lead** button
- [x] Create an Opportunity with: `id`, `name`, `stage`, `amount` _(optional)_ and `accountName`
- [x] Display Opportunities in a simple table

### **4. User Experience & States**

- [x] Show **loading** state
- [x] Handle ~100 leads without lag
- [x] Show **empty** state
- [x] Show **error** state

## 🚀 Enhanced Features

### **Nice-to-Haves** _(pick 1–2)_

- [x] Persist filter/sort in **localStorage**
- [ ] Implement **optimistic updates** with rollback on simulated failure
- [x] Make layout responsive for **desktop → mobile**

## 🛠️ Technical Stack

### **Core Technologies**

- [x] Use **React** (Vite)
- [x] Use **Tailwind CSS** for styling
- [x] No backend – only local JSON + `setTimeout` for latency simulation
