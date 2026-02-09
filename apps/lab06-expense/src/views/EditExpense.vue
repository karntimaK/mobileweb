<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>แก้ไขรายการ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- ชื่อรายการ -->
      <ion-input
        label="ชื่อรายการ"
        @ionInput="onTitleInput"
        :value="title"
      />

      <!-- จำนวนเงิน -->
      <ion-input
        label="จำนวนเงิน"
        type="number"
        @ionInput="onAmountInput"
        :value="amount"
      />

      <!-- ประเภท -->
      <ion-select label="ประเภท" v-model="type">
        <ion-select-option value="income">รายรับ</ion-select-option>
        <ion-select-option value="expense">รายจ่าย</ion-select-option>
      </ion-select>

      <ion-button expand="block" @click="updateExpense">
        อัปเดต
      </ion-button>

      <ion-button expand="block" color="danger" @click="deleteExpense">
        ลบข้อมูล
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
  IonButton,
} from '@ionic/vue';

import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

/* state */
const title = ref('');
const amount = ref(''); 
const type = ref<'income' | 'expense'>('expense');

/* โหลดข้อมูลเดิม */
onMounted(async () => {
  const snap = await getDoc(doc(db, 'expenses', id));
  if (snap.exists()) {
    const data = snap.data();
    title.value = data.title ?? '';
    amount.value = String(data.amount ?? '');
    type.value = data.type ?? 'expense';
  }
});

/* ดักค่า input */
const onTitleInput = (e: any) => {
  title.value = e.target.value ?? '';
};

const onAmountInput = (e: any) => {
  amount.value = e.target.value ?? '';
};

/* อัปเดตข้อมูล */
const updateExpense = async () => {
  const amountNumber = Number(amount.value);

  if (title.value.trim() === '') {
    alert('กรุณากรอกชื่อรายการ');
    return;
  }

  if (isNaN(amountNumber) || amountNumber <= 0) {
    alert('กรุณากรอกจำนวนเงินให้ถูกต้อง');
    return;
  }

  await updateDoc(doc(db, 'expenses', id), {
    title: title.value.trim(),
    amount: amountNumber,
    type: type.value,
  });

  router.push('/tabs/list');
};

/* ลบข้อมูล */
const deleteExpense = async () => {
  if (confirm('ยืนยันการลบข้อมูล?')) {
    await deleteDoc(doc(db, 'expenses', id));
    router.push('/tabs/list');
  }
};
</script>
