<template>
  <ion-page>
    <ion-tabs>
      <!-- สำคัญมาก: ตรงนี้คือที่แสดงหน้า list / add -->
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <!-- TAB รายการ -->
        <ion-tab-button tab="list" href="/tabs/list">
          <ion-icon aria-hidden="true" :icon="list" />
          <ion-label>รายการ</ion-label>
        </ion-tab-button>

        <!-- TAB เพิ่มข้อมูล -->
        <ion-tab-button tab="add" href="/tabs/add">
          <ion-icon aria-hidden="true" :icon="add" />
          <ion-label>เพิ่ม</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue';

import { list, add } from 'ionicons/icons';
</script>
