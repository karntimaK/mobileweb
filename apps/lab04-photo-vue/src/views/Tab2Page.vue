<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
        <div class="student-info">
        <span>โดย การติมา คำภีร์</span>
        <span>รหัส 663380199-4</span>
      </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

       <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>


      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <!-- CHANGE: Add a click event listener to the floating action button. -->
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonFab, IonFabButton, IonIcon,
  IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonImg
} from '@ionic/vue';

// import composable
import { usePhotoGallery } from '@/composables/usePhotoGallery';

// ดึง photos + addNewToGallery ออกมาใช้
const { photos, addNewToGallery } = usePhotoGallery();
</script>

<style scoped>
.student-info {
  text-align: left;
  margin-top: 8px;
  margin-left: 20px;
  font-size: 13px;
  color: #666;
  display: flex;
  flex-direction: column;
}

ion-fab {
  bottom: 70px;
}
</style>