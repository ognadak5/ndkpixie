import { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle,
  IonToolbar, IonInput, IonCard, IonCardContent, IonImg, IonItem, IonRange, IonLabel,
  IonToast, IonButton} from '@ionic/react';
import './Page.css';

import { pixelit } from '../lib/pixelit.js';

const Page: React.FC = () => {

  const [showToast1, setShowToast1] = useState(false);

  const [url, setUrl] = useState('https://source.unsplash.com/random');
  const [value, setValue] = useState(0);

  const mypalette = [
    [26,28,44],[93,39,93],[177, 62, 83],[239, 125, 87],[255, 205, 117],[167, 240, 112],[56, 183, 100],[37, 113, 121],[41, 54, 111],[59, 93, 201],[65, 166, 246],[115, 239, 247],[244, 244, 244],[148, 176, 194],[86, 108, 134],[51, 60, 87]
  ];
  const config = {from:  document.getElementById('pixelitimg'),
                  to: document.getElementById('pixelitcanvas'),
                  "palette": mypalette,
                  scale: value}
  let px:any = {};

  useEffect(() => {
    px = new pixelit(config);
    console.log(px);
    px.getStatus();
  }, []);

  function pixi(){
    px = new pixelit(config);
    px.draw().pixelate().convertPalette();
  }

  function downloadImage(){
    px = new pixelit(config);
    px.saveImage();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ding-E Bot</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ding-E Bot</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonInput className='imageUrl' type='url' autofocus clearInput placeholder={ url } debounce={3000} onIonChange={e => {setUrl(e.detail.value as string); setShowToast1(true)}}></IonInput>

        <IonCard className='imageView' >
          <IonCardContent>
            <img src={url} id='pixelitimg'  alt="" height="95%" width="95%"></img>
          </IonCardContent>
        </IonCard>

        <IonCard className='imageView' >
          <IonCardContent>
            <canvas id="pixelitcanvas"  width="95%" height="95%" ></canvas>
          </IonCardContent>
        </IonCard>


        <IonItem>
            <IonRange min={0} max={50} color="secondary" pin={true} value={value} onIonChange={e => {setValue(e.detail.value as number); pixi();}} >
              <IonLabel slot="start">-</IonLabel>
              <IonLabel slot="end">+</IonLabel>
            </IonRange>
        </IonItem>

        <br/>
        <br/>
        <IonButton color="primary" expand='block' fill='clear' onClick={() => { downloadImage() }}>Download</IonButton>
        <IonButton color="primary" expand='block' fill='clear' onClick={() => { window.location.reload(false); }}>Refresh</IonButton>

        <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Loading Image ..."
        duration={1000}
        />

      </IonContent>
    </IonPage>
  );
};

export default Page;
