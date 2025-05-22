# 💼 Pressupostos (React + TypeScript)

Aquest projecte és una aplicació de calculadora de pressupostos interactiva desenvolupada amb **React**, **TypeScript** i **Vite**, i estilitzada amb **Tailwind CSS**.

## 🚀 Funcionalitats

### ✅ Selecció de serveis
- L'usuari pot seleccionar entre diferents serveis:
  - **Seo** (300 €)
  - **Ads** (400 €)
  - **Web** (500 € + cost addicional per pàgines i idiomes)

### 🧩 Configuració de Web
- Si l'usuari selecciona el servei "Web", pot configurar:
  - Nombre de **pàgines**
  - Nombre de **llenguatges**
- Cada unitat addicional de pàgines o idiomes incrementa el preu en **30 €**.

### 💰 Càlcul del total
- El total es calcula dinàmicament segons els serveis seleccionats.
- Opcionalment, l'usuari pot activar un **pressupost anual** amb **20% de descompte**.

### 📝 Formulari per demanar pressupost
- Inputs per:
  - **Nom**
  - **Telèfon**
  - **Email**
- Validació de correu i número de telèfon.
- Un cop enviat, es guarda un nou **pressupost** amb:
  - Serveis seleccionats
  - Total
  - Data

### 📋 Llistat de pressupostos
- Tots els pressupostos guardats es mostren amb:
  - Dades del client
  - Serveis contractats
  - Import total
- Funcionalitats:
  - **Cercar per nom**
  - **Ordenar per**: Nom, Data o Import
  - **Reiniciar filtres**

---

## 🗂️ Estructura del projecte

```bash
src/
├── components/
│   ├── BudgetForm.tsx
│   ├── BudgetList.tsx
│   ├── Calculator.tsx
│   ├── ServiceSelector.tsx
│   └── WebConfigurator.tsx
├── pages/
│   └── Welcome.tsx
├── router/
├── types/
├── App.tsx
├── main.tsx
├── styles.css
├── tailwindCssStyle.css
├── vite-env.d.ts
```

---

## 🛠️ Tecnologies

- ⚛️ React
- 📘 TypeScript
- 💨 Tailwind CSS
- ⚡ Vite
- 🧭 React Router
- 📦 npm

---

## 🧪 Execució del projecte

1. **Instal·lació de dependències**
   ```bash
       npm install
   ```

2. **Inici del servidor de desenvolupament**
   ```bash
       npm run dev
   ```

3. **Compilació per producció**
   ```bash
   npm run build
   ```

---

## ✨ Millores possibles

- Persistència dels pressupostos a `localStorage` o backend.
- Exportació a PDF.
- Autenticació d’usuaris.
- Traduccions multilingües.

---

## 📸 Captura

> L'estructura del projecte tal com es veu a Visual Studio Code:

![image](https://github.com/user-attachments/assets/20866b1c-b4bf-4194-92e0-9d4bff559469)

---
