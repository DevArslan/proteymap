import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapObjectsComponent } from './map-objects.component';

describe('MapObjectsComponent', () => {
  let component: MapObjectsComponent;
  let fixture: ComponentFixture<MapObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
