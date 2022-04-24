import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;
  constructor(private iab: InAppBrowser, private platform: Platform,
    private actionsheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  ngOnInit() { }

  openArticle() {
    /**
     * Se importa plataform para validar si estamos desde un navegador o un dispositivo movil.
     */
    if (this.platform.is('ios') || this.platform.is('android')) {
      const navegador = this.iab.create(this.article.url);
      navegador.show();
      return;
    }
    //Para web es windows.open
    window.open(this.article.url, '_blank');
  }

  async onOpenMenu() {

    const articleInFavorite= this.storageService.articleInFavorite(this.article);

    const actionBtn: ActionSheetButton[] = [{
      text: articleInFavorite? 'Remover Favorito':'Favorito',
      icon: articleInFavorite? 'heart':'heart-outline',
      handler: () => this.toogleFavorite()
    },
    {
      text: 'Cancelar',
      icon: 'close-outline',
      role: 'cancel'
    }];

    const shareAction: ActionSheetButton =
    {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.sharedArticle()
    };

    if (this.platform.is('capacitor')) {
      actionBtn.unshift(shareAction);
    }

    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Acciones',
      buttons: actionBtn
    }
    );

    await actionSheet.present();
  }

  sharedArticle() {
    // console.log('Compartiendo articulo');
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    );
  }

  toogleFavorite() {
    // console.log('Cambiando ffavorito!');
    this.storageService.saveRemoveArticle(this.article);
  }

}
