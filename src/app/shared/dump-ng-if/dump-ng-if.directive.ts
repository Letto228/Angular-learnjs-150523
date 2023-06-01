import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appDumpNgIf]',
})
export class DumpNgIfDirective<T> {
    @Input() set appDumpNgIf(value: T | null | undefined) {
        const isVisibility = Boolean(value);
        const isContainerHasView = Boolean(this.viewContainer.length);

        if (isVisibility && !isContainerHasView) {
            this.viewContainer.createEmbeddedView(this.tempalte, {value, $implicit: value});

            return;
        }

        if (!isVisibility && isContainerHasView) {
            this.viewContainer.clear();
        }
    }

    // DumpNgIfDirective.appDumpNgIf = newInputValue;
    //
    // appDumpNgIf: T | null | undefined;
    // set appDumpNgIf(newInputValue: T | null | undefined) {...}

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly tempalte: TemplateRef<{value: T; $implicit: T}>,
    ) {}
}

// @Directive({
//     selector: '[appDumpNgIf]',
// })
// export class DumpNgIfDirective<T> {
//     @Input() appDumpNgIfElse: TemplateRef<unknown> | undefined;
//     @Input() set appDumpNgIf(value: T | null | undefined) {
//         const isVisibility = Boolean(value);
//         const isContainerHasView = Boolean(this.viewContainer.length);

//         if (isContainerHasView) {
//             this.viewContainer.clear();
//         }

//         if (isVisibility) {
//             this.viewContainer.createEmbeddedView(this.tempalte);

//             return;
//         }

//         this.viewContainer.createEmbeddedView(this.appDumpNgIfElse as TemplateRef<unknown>);

//         // if (!isVisibility && isContainerHasView) {
//         //     this.viewContainer.clear();
//         //     this.viewContainer.createEmbeddedView(this.appDumpNgIfElse as TemplateRef<unknown>);
//         // }
//     }

//     // DumpNgIfDirective.appDumpNgIf = newInputValue;
//     //
//     // appDumpNgIf: T | null | undefined;
//     // set appDumpNgIf(newInputValue: T | null | undefined) {...}

//     constructor(
//         private readonly viewContainer: ViewContainerRef,
//         private readonly tempalte: TemplateRef<unknown>,
//     ) {}
// }
