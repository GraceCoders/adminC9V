import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function CompareDate(start_date: any, end_date: any) {
    return (formGroup: FormGroup) => {
        const start = formGroup.controls[start_date];
        const end = formGroup.controls[end_date];
        if (start.errors && !end.errors.validDate) {
            return;
        }

        if (end.value < start.value) {
            end.setErrors({ validDate: true });
        } else {
            end.setErrors(null);
        }
    }

}

export function EditorData (description: any){
   return (formGroup: FormGroup)=> {
       const text_data = formGroup.controls[description];
    //    console.log("===== print text editor data =====>>>>>====", text_data.value); 
       if(!text_data.value){
        //    console.log("===== no data founr ")
          text_data.setErrors({validEditor: true})
       }else{
           text_data.setErrors(null);
       }

   }
}


export function CompareTime(start_time:any,end_time: any){
    return (formGroup: FormGroup)=>{
        const start = formGroup.controls[start_time];
        const end = formGroup.controls[end_time];
        // console.log("==== print start time ======",start.value);
        // console.log("======= end time =========",end.value);
        if(!start.value){
            start.setErrors({start_required: true})
        }
        if(!end.value){
            end.setErrors({end_required: true})
        }
        if(start.value == null || end.value == null){
            start.setErrors({startNotNull: true});
            end.setErrors({ endNotNull: true });

        }
    }
}

