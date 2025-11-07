# WhenWhere – Frontend

## Stack Tecnologico
- **Framework:** React + TypeScript (Vite)
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Calendario:** FullCalendar
- **UI/UX:** CSS puro, palette personalizzata, react-hot-toast
- **Routing:** react-router
- **Utilità/Librerie:** react-icons, react-modals, openapi-cli-generator

---

## Funzionalità Principali
- Autenticazione tramite token JWT (login/registrazione)
- Area personale
  - Creazione e gestione agende multiple (pubbliche/private)
  - Aggiunta, modifica e rimozione eventi (anche multi-day)
  - Note tematiche per ogni agenda
- Sezione Social
  - Esplorazione agende pubbliche
  - Like e condivisioni
  - Ricerca utenti e visualizzazione dei loro profili
- Area Admin
  - Visualizzazione utenti
  - Statistiche e rimozione account

---

## Architettura del Frontend
- **Presentation Layer**: componenti React e pagine
- **Routing**: gestito con react-router
- **State globale**: Zustand per sessioni, agende, social feed
- **API client**: wrapper Axios con inserimento automatico del token
- **Calendario**: interfaccia interattiva con FullCalendar

---

## Flusso di Autenticazione
1. L'utente effettua il login
2. Il backend restituisce un token JWT
3. Axios inserisce il token nell'header `Authorization`
4. Le chiamate a endpoint protetti sono permesse se il token è valido

---

## Avvio in Sviluppo
Prerequisiti:
- Node.js
- Backend .NET attivo

Comandi:
```bash
npm install
npm run dev
```

---

## Struttura Consigliata delle Cartelle
```
src/
  components/
  pages/
  store/        # Zustand
  api/          # Axios client + servizi
  calendar/     # configurazione FullCalendar
  styles/
```

---

## Sviluppi Futuri
- Integrazione Google Calendar API
- Google Maps per i luoghi degli eventi
- Allegati multimediali per eventi passati
- Filtri avanzati e paginazione social
- Import/export ICS
- Test automatici funzionali ed E2E

