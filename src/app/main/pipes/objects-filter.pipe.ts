import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectsFilter'
})
export class ObjectsFilterPipe implements PipeTransform {

  transform(objects: any, title: any): any {
    if (title === "") return objects;
    
    return objects.filter(function(object) {
      try {
        return (
          object.title.toUpperCase().indexOf(title.toUpperCase()) > -1
        );
      } catch (error) {

      }
    });
  }

}
