// CHANGE: Add the following import
import { camera } from 'ionicons/icons';
// CHANGE: Update the following import
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonLabel,  IonGrid,IonImg, IonRow, IonCol } from '@ionic/react';
// CHANGE: Remove or comment out `ExploreContainer`
// import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
// CHANGE: Add `usePhotoGallery` import
import { usePhotoGallery } from '../hooks/usePhotoGallery';


const Tab2: React.FC = () => {
   // CHANGE: Destructure `addNewToGallery()` from `usePhotoGallery()`
  const { photos, addNewToGallery } = usePhotoGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
          <IonTitle size="small">Lab 05 - โดย การติมา คำภีร์ 663380199-4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
            <IonTitle size="small">Lab 05 - โดย การติมา คำภีร์ 663380199-4</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>


        {/* CHANGE: Add the floating action button */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
           {/* CHANGE: Add a click event listener to the floating action button */}
          <IonFabButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>


        {/* CHANGE: Remove or comment out `ExploreContainer` */}
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};


export default Tab2;
