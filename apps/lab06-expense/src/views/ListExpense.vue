<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>รายการรายรับ–รายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item
          v-for="item in expenses"
          :key="item.id"
          button
          @click="goEdit(item.id)"
        >
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>
              {{ item.amount }} บาท
              <span v-if="item.type === 'income'">(รายรับ)</span>
              <span v-else>(รายจ่าย)</span>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-item>
        <ion-label>รวมรายรับ: {{ totalIncome }} บาท</ion-label>
      </ion-item>

      <ion-item>
        <ion-label>รวมรายจ่าย: {{ totalExpense }} บาท</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';

/* 1. สร้าง interface ให้ TypeScript รู้โครงสร้างข้อมูล */
interface Expense {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  note?: string;
  createdAt?: any;
}

const router = useRouter();

/*2. กำหนด type ให้ expenses */
const expenses = ref<Expense[]>([]);
const totalIncome = ref(0);
const totalExpense = ref(0);

/*3. ดึงข้อมูลจาก Firestore แบบ Realtime */
onMounted(() => {
  onSnapshot(collection(db, "expenses"), (snapshot) => {
    expenses.value = [];
    totalIncome.value = 0;
    totalExpense.value = 0;

    snapshot.forEach((doc) => {
      const data = doc.data() as Omit<Expense, "id">;

      const expense: Expense = {
        id: doc.id,
        ...data
      };

      expenses.value.push(expense);

      if (expense.type === "income") {
        totalIncome.value += expense.amount;
      } else {
        totalExpense.value += expense.amount;
      }
    });
  });
});

/* ไปหน้าแก้ไข */
const goEdit = (id: string) => {
  router.push(`/tabs/edit/${id}`);
};
</script>
