import {
  Component,
  IComponentBindings,
  ComponentOptions,
} from "coveo-search-ui";
import { lazyComponent } from "@coveops/turbo-core";

export interface IHideWhenNoResultsOptions {
  sectionToHideQuerySelector: string;
}

@lazyComponent
export class HideWhenNoResults extends Component {
  static ID = "HideWhenNoResults";
  static options: IHideWhenNoResultsOptions = {
    sectionToHideQuerySelector: ComponentOptions.buildStringOption(),
  };

  constructor(
    public element: HTMLElement,
    public options: IHideWhenNoResultsOptions,
    public bindings?: IComponentBindings
  ) {
    super(element, HideWhenNoResults.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(
      element,
      HideWhenNoResults,
      options
    );

    this.bind.onRootElement(Coveo.QueryEvents.noResults, () =>
      this.handleNoResults()
    );
  }

  /**
   * After Components Init
   */
  private handleNoResults() {
    if (
      this.options.sectionToHideQuerySelector &&
      <HTMLElement>(
        document.querySelector(this.options.sectionToHideQuerySelector)
      )
    ) {
      Coveo.$$(
        <HTMLElement>(
          document.querySelector(this.options.sectionToHideQuerySelector)
        )
      ).hide();
    }
  }
}
