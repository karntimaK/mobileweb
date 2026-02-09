<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>เพิ่มรายการรายรับ–รายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- ชื่อรายการ -->
      <ion-input
        label="ชื่อรายการ"
        placeholder="เช่น ค่าอาหาร"
        @ionInput="onTitleInput"
      />

      <!-- จำนวนเงิน -->
      <ion-input
        label="จำนวนเงิน"
        type="number"
        placeholder="เช่น 50"
        @ionInput="onAmountInput"
      />

      <!-- ประเภท -->
      <ion-select label="ประเภท" v-model="type">
        <ion-select-option value="income">รายรับ</ion-select-option>
        <ion-select-option value="expense">รายจ่าย</ion-select-option>
      </ion-select>

      <!-- หมวดหมู่ -->
      <ion-input
        label="หมวดหมู่"
        @ionInput="onCategoryInput"
      />

      <!-- หมายเหตุ -->
      <ion-textarea
        label="หมายเหตุ"
        auto-grow
        @ionInput="onNoteInput"
      />

      <ion-button expand="block" @click="saveExpense">
        บันทึกข้อมูล
      </ion-button>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
} from '@ionic/vue';

import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();

/* state */
const title = ref('');
const amount = ref('');
const type = ref<'income' | 'expense'>('expense');
const category = ref('');
const note = ref('');

/* 🔥 ดักค่าตรงจาก event */
const onTitleInput = (e: any) => {
  title.value = e.target.value ?? '';
};

const onAmountInput = (e: any) => {
  amount.value = e.target.value ?? '';
};

const onCategoryInput = (e: any) => {
  category.value = e.target.value ?? '';
};

const onNoteInput = (e: any) => {
  note.value = e.target.value ?? '';
};

const saveExpense = async () => {
  const amountNumber = Number(amount.value);

  console.log('DEBUG:', title.value, amountNumber);

  if (title.value.trim() === '') {
    alert('กรุณากรอกชื่อรายการ');
    return;
  }

  if (isNaN(amountNumber) || amountNumber <= 0) {
    alert('กรุณากรอกจำนวนเงินให้ถูกต้อง');
    return;
  }

  await addDoc(collection(db, 'expenses'), {
    title: title.value.trim(),
    amount: amountNumber,
    type: type.value,
    category: category.value.trim(),
    note: note.value.trim(),
    createdAt: new Date(),
  });

  router.push('/tabs/list');
};
</script>
