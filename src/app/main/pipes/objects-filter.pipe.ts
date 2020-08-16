import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectsFilter'
})
export class ObjectsFilterPipe implements PipeTransform {

  transform(objects: any, title: any): any {
    
    return objects.filter(function(object) {
      console.log(object)
      if (title === "") return true;
      else {
        try {
          return (
            object.title.toUpperCase().indexOf(title.toUpperCase()) > -1
          );
        } catch (error) {

        }
      }
    });
  }

}
