import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FaleconoscoService } from '@app/faleconosco/faleconosco.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { SharedService } from '@app/shared/services/shared.service';
import { UnidadesService } from '@app/unidades/unidades.service';

@Component({
  selector: 'app-franqueados',
  templateUrl: './franqueados.component.html',
  styleUrls: ['./franqueados.component.scss']
})
export class FranqueadosComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = -23.2229963;
  lng = -45.9081407;
  form!: FormGroup;
  estados: any;
  cidades: any;
  unidades: any;
  markers: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private faleconoscoService: FaleconoscoService,
    private sharedService: SharedService,
    private unidadesService: UnidadesService
  ) {}

  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 4,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  };

  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'Hello World!'
  });

  styledMapType = new google.maps.StyledMapType(
    [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e9e9e9'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dedede'
          },
          {
            lightness: 21
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on'
          },
          {
            color: '#ffffff'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36
          },
          {
            color: '#333333'
          },
          {
            lightness: 40
          }
        ]
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f2f2f2'
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#fefefe'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#fefefe'
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      }
    ],
    { name: 'Styled Map' }
  );
  ngAfterViewInit(): void {
    this.getUnidades();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Adding Click event to default marker
    // this.marker.addListener('click', () => {
    //   const infoWindow = new google.maps.InfoWindow({
    //     content: this.marker.getTitle()
    //   });
    //   infoWindow.open(this.marker.getMap(), this.marker);
    // });

    //Adding default marker to map
    // this.marker.setMap(this.map);

    this.map.mapTypes.set('styled_map', this.styledMapType);
    this.map.setMapTypeId('styled_map');

    //Adding other markers
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach((markerInfo: any) => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

  ngOnInit() {
    this.createForm();
    this.getEstados();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.email],
      possuiInvestimentoInicial: ['', Validators.required],
      regiaoDeInteresse: ['', Validators.required],
      cidadeDeInteresse: ['', Validators.required]
    });
  }

  enviar() {
    const form$ = this.faleconoscoService.franqueados(this.form.value);
    form$
      .pipe(
        catchError((error): any => {
          Swal.fire('Erro', error, 'error');
        })
      )
      .subscribe(
        response => {
          Swal.fire('Mensagem enviada com sucesso', response.mesagem, 'success');
        },
        error => {
          console.log(error);
        }
      );
  }

  getUnidades() {
    this.unidadesService.getUnidadesGeolocalizacao().subscribe(
      response => {
        //console.log(response);
        this.unidades = response;

        for (let unidade of this.unidades) {
          console.log('Unidade', unidade);
          this.markers.push({
            position: new google.maps.LatLng(unidade.latitude, unidade.longitude),
            map: this.map,
            title: unidade.nome,
            icon: '../assets/content/map-icon.png'
          });
        }

        // this.markers = [
        //   {
        //     position: new google.maps.LatLng(40.73061, 73.935242),
        //     map: this.map,
        //     title: 'Marker 1'
        //   },
        //   {
        //     position: new google.maps.LatLng(32.06485, 34.763226),
        //     map: this.map,
        //     title: 'Marker 2'
        //   }
        // ];

        this.mapInitializer();
      },
      error => {
        console.log(error);
      }
    );
  }

  getEstados() {
    this.sharedService.getEstados().subscribe(
      response => {
        this.estados = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCidadesPorEstado() {
    this.sharedService.getCidadesPorEstado(this.form.get('regiaoDeInteresse').value.codigo).subscribe(
      response => {
        this.cidades = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
