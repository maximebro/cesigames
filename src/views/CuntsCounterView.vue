<template>
    <v-container class="position-relative cunts-counter-style" fluid style="min-height: calc(100vh - 64px);">
        <div class="d-flex align-center justify-space-between mb-12" style="flex-wrap: wrap;">
            <div class="brand">
                <h1 class="mb-0">GEO <span>CHIEURS</span></h1>
                <p>Compteur de chieurs en MAALSI</p>
            </div>
            <v-btn class="btn-add" rounded prepend-icon="mdi-plus" size="large" @click=addCard>
                <span>Nouveau chieur</span>
            </v-btn>
        </div>

        <v-row>
            <v-col v-if="isLoading" cols="12" class="d-flex">
                <div class="loading d-flex align-center ga-3 mx-auto">
                    <v-progress-circular indeterminate color="#e8ff47"/>
                    <p>Chargement en cours...</p>
                </div>
            </v-col>

            <v-col v-else-if="cards.length === 0" cols="12">
                <div class="empty">
                <div class="big">☐</div>
                    <p>Aucune carte — crée-en une !</p>
                </div>
            </v-col>

            <v-col v-else v-for="card in cards" :key="card.id" cols="12" md="4" lg="3">
                <div class="card">
                    <v-btn class="btn-delete rounded" size="x-small" variant="text" title="Supprimer" density="comfortable" tile icon @click="deleteCard(card)">
                        <v-icon icon="mdi-trash-can"/>
                    </v-btn>

                    <v-text-field v-model="card.title" class="card-title mt-n2" variant="plain" density="compact" placeholder="Titre de la carte..." @blur="updateTitle(card)" hide-details/>

                    <div class="counter">
                        <v-btn class="counter-btn minus rounded" variant="outlined" icon="mdi-minus" size="small" tile @click="decrement(card)"/>
                        <v-number-input
                            v-bump="card.counter" :class="`counter-input counter-value${card.counter < 0 ? ' neg' : ''}`" style="max-width: fit-content;"
                            v-model="card.counter" density="compact" variant="plain" control-variant="hidden" hide-details :min="0" :step="1"
                            @update:model-value="counterChanged(card)"
                        />
                        <!-- <span :class="`counter-value${card.counter < 0 ? ' neg' : ''}`" :id="`val-${card.id}`">{{ card.counter }}</span> -->
                        <v-btn class="counter-btn plus rounded" variant="outlined" icon="mdi-plus" size="small" tile @click="increment(card)"/>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { db } from '@/db/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc, type Unsubscribe, orderBy, query } from 'firebase/firestore';

type CardType = {
    id: string; // Firebase document id
    title: string;
    counter: number;
    createdAt: Date,
};

const isLoading = ref<boolean>(false);
const cards = ref<CardType[]>([]);

const unsubscribe = ref<Unsubscribe | null>(null);
onMounted(() => {
    isLoading.value = true;
    
    const q = query(collection(db, 'cards'), orderBy('createdAt', 'desc'));

    unsubscribe.value = onSnapshot(q, (querySnapshot) => {
        const _items: CardType[] = [];
        querySnapshot.forEach((x) => _items.push({ id: x.id, ...x.data() as { title: string, counter: number, createdAt: Date } || { title: '', counter: 0, createdAt: new Date() } }));
        
        cards.value = _items;
        isLoading.value = false;
    }, 
    (error) => {
        console.error("Erreur temps réel :", error);
        isLoading.value = false;
    });
});

onUnmounted(() => unsubscribe.value?.());

async function addCard() {
    const cardData = { title: '', counter: 0, createdAt: new Date() };
    
    try {
        const docRef = await addDoc(collection(db, "cards"), cardData);
    } 
    catch (error) {
        console.error("Erreur lors de l'ajout :", error);
    }
}

async function deleteCard(card: CardType) {
    const docRef = doc(db, "cards", card.id);
    await deleteDoc(docRef);
}

async function updateTitle(card: CardType) {
    const docRef = doc(db, "cards", card.id);
    await updateDoc(docRef, { title: card.title });
}

async function counterChanged(card: CardType) {
    card.counter ??= 0;
    const docRef = doc(db, "cards", card.id);
    await updateDoc(docRef, { counter: card.counter });
}

async function increment(card: CardType) {
    const docRef = doc(db, "cards", card.id);
    await updateDoc(docRef, { counter: card.counter + 1 });
}

async function decrement(card: CardType) {
    const docRef = doc(db, "cards", card.id);
    await updateDoc(docRef, { counter: card.counter - 1 });
}

const vBump = {
  updated(el: HTMLElement, binding: any) {
        if (binding.value === binding.oldValue) return;
        
        const inputEl = el.querySelector('input');
        if (inputEl) {
            inputEl.classList.remove('bump');
            void inputEl.offsetWidth;
            inputEl.classList.add('bump');
        }
    }
};
</script>


<style scoped>
.cunts-counter-style {
    --surface: #18181b;
    --border: #2e2e35;
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --text: #f0f0f0;
    --muted: #888;
    --radius: 14px;
    background: #0e0e0f;
    color: var(--text);
    font-family: 'Syne', sans-serif;
    padding: 0px 40px 24px 80px;
}

/* Grain overlay */
.cunts-counter-style::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: -1;
    opacity: 0.4;
}

.brand h1 {
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
}

.brand h1 span {
    color: var(--accent);
}

.brand p {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.btn-add {
    background: var(--accent);
    padding: 12px 22px;
    color: #0E0E0F;
    transition: transform 0.15s, box-shadow 0.15s;
}

.btn-add span {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
}

.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232, 255, 71, 0.25);
}

.btn-add:active {
    transform: scale(0.97);
}

.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    animation: cardIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    transition: border-color 0.2s;
}

@keyframes cardIn {
    from {
        opacity: 0;
        transform: scale(0.88) translateY(12px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.card:hover {
    border-color: #444;
}

/* Delete btn */
.btn-delete {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    color: var(--muted);
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;
    line-height: 0;
}

.btn-delete:hover {
    color: #ff4d4d;
    background: rgba(255, 77, 77, 0.1);
}

/* Title */
.card-title {
    position: relative;
    font-size: 1rem;
    font-weight: 700;
    background: transparent;
    border: none;
    color: var(--text);
    font-family: 'Syne', sans-serif;
    max-width: calc(100% - 24px);
    outline: none;
}

.card-title:focus {
    border-bottom-color: var(--accent);
    white-space: normal;
    overflow: visible;
}

:deep(.card-title .v-field__input) {
    border-bottom: 1.5px solid transparent;
    transition: border-color 0.2s;
    padding-bottom: 2px;
}

:deep(.card-title.v-field--focused .v-field__input),
:deep(.card-title input:focus) {
    border-bottom-color: var(--accent);
}

/* Counter */
.counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1F1F24;
    border-radius: 10px;
    padding: 6px 8px;
}

.counter-btn {
    width: 36px;
    height: 36px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    line-height: 1;
}

.counter-btn.minus:hover {
    background: rgba(255, 107, 53, 0.15);
    border-color: var(--accent2);
    color: var(--accent2);
}

.counter-btn.plus:hover {
    background: rgba(232, 255, 71, 0.1);
    border-color: var(--accent);
    color: var(--accent);
}

.counter-btn:active {
    transform: scale(0.93);
}

.counter-value {
    font-family: 'DM Mono', monospace;
    font-weight: 500;
    min-width: 48px;
    text-align: center;
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s;
    color: var(--text);
}

:deep(.counter-input .v-field__input) {
    font-size: 1.5rem;
    text-align: center;
    padding: 0;
}

:deep(.counter-input input.bump) {
    animation: bump 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.counter-value.bump {
    animation: bump 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.counter-value.neg {
    color: var(--accent2);
}

@keyframes bump {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.35);
    }

    100% {
        transform: scale(1);
    }
}

/* Empty state */
.empty {
    text-align: center;
    padding: 64px 0;
    color: var(--muted);
}

.empty p {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    margin-top: 8px;
}

.empty .big {
    font-size: 3rem;
    line-height: 1;
}

.loading {
    text-align: center;
    padding: 64px 0;
    color: var(--muted);
}
</style>