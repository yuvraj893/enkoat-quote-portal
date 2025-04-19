# EnKoat Quote Portal & Performance Dashboard

## 📝 Summary  
This is a **full‑stack prototype** built for the EnKoat internship assignment. It simulates a contractor‑facing interface where users can:
- **Submit roofing project quotes** via a responsive form  
- **Browse a performance dashboard** with key metrics and interactive charts  
- **View a contractors list** showing each contractor’s project stats  

> **Note:** All data you see in the UI is currently loaded from **mock data**. The backend API (Express + MongoDB) is scaffolded but **not yet wired up**—form submissions and dashboard/contractor views still use in‑memory data. Backend calls will be implemented in the next iteration.

---

## 🚀 Features

1. **Submit Quote**  
   - Fields: Contractor Name, Company, Roof Size, Roof Type, State, City, Project Date  
   - Client‑side validation  
   - Clears form and returns to Dashboard on “Submit”

2. **Performance Dashboard**  
   - **Filter Bar:** Date range, State & Roof Type filters  
   - **Summary Cards:**  
     - Total Projects  
     - Average Roof Size (sq ft)  
     - Total Energy Savings (kWh)  
     - Completion Rate (%)  
   - **Charts:**  
     - Monthly Trends (Line)  
     - Projects by State (Bar)  
     - Projects by Roof Type (Pie)  
     - Energy Savings by Roof Type (Bar)  
   - **Export** PDF of current view

3. **Contractors List**  
   - Table of contractors, company, total projects, roof size, latest project date  

4. **Responsive UI**  
   - Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**  

---

## 🛠️ Tech Stack

- **Frontend:** Vite + React + TypeScript + Tailwind CSS  
- **Charting:** Victory / Recharts  
- **State:** React Context  
- **Mock Data:** `src/data/mockData.ts` (1,000+ sample entries)  
- **Export:** `src/utils/pdfExport.ts` for PDF reports  

---

## 📦 Install & Run Locally

```bash
git clone https://github.com/yuvraj893/enkoat-quote-portal.git
cd enkoat-quote-portal
npm install
npm run dev        # starts Vite on http://localhost:5173/
