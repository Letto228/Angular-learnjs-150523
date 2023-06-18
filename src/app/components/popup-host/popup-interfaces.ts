import {TemplateRef} from '@angular/core';

export interface ITemplateContext {
    $implicit: string;
}

export interface ITemplateOutlet {
    template: TemplateRef<ITemplateContext> | null;
    context: ITemplateContext | null;
}
