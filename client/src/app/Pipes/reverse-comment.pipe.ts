import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseComment'
})
export class ReverseCommentPipe implements PipeTransform {

  transform(arr) {
      var copy = arr.slice();
      return copy.reverse();
    }

}
