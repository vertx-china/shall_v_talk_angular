import {Injectable} from '@angular/core';
import {ANIMATES} from "../../domain/entity/animation";

declare let Snap: any;
declare let mina: any;

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  animate: any;
  path: any;
  time = 500;
  self: any;
  pageload: any;

  constructor() {
    this.createDom();
  }

  private createDom() {
    let bg = document.createElement('div');
    bg.className = 'loadbg';
    let svg: any = document.getElementById('svg');
    this.pageload = document.getElementById('pageload');
    this.path = svg.children[0];
    svg.appendChild(this.path);
    this.self = Snap(this.path);
  }

  static isEmpty(value: any): boolean {
    return value === undefined || value === 'undefined' || JSON.stringify(value) === '{}' || value === null ||
      typeof value === 'string' && value.length === 0 || value === false;
  }

  static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }


  public init(animate: any = ANIMATES.Wave, time = 500) {
    let openingStepsTotal = AnimationService.isNotEmpty(animate['opening']) ? 1 : 1;
    let closingStepsTotal = AnimationService.isNotEmpty(animate['closing']) ? 1 : 1;
    let speedOut = animate['speedOut'] || animate['speedIn'];
    let easingOut = animate['easingOut'] || animate['easingIn'];
    this.animate = Object.assign({}, {
      initialPath: animate.path,
      openingSteps: animate.opening,
      openingStepsTotal: openingStepsTotal,
      closingSteps: animate['closing'] || animate.path,
      closingStepsTotal: closingStepsTotal,
      speedOut: speedOut,
      easingOut: easingOut,
      speedIn: animate.speedIn,
      easingIn: animate.easingIn
    });
    this.time = time;
    return this;
  }

  public play() {
    if (AnimationService.isEmpty(this.animate)) {
      throw  new Error('动画初始化失败!');
    }
    let that = this;
    that.path.style.fill = '#f52857d6';
    that.path.style.fill = '#248c5f';
    that.path.setAttribute('d', this.animate.initialPath);
    that.pageload.className = 'pageload-overlay show';
    that.animateSVG(this.self, 'in', function () {
    });
  }

  public hide(time: any) {
    if (AnimationService.isEmpty(this.animate)) {
      throw  new Error('动画初始化失败!');
    }
    if (AnimationService.isNotEmpty(time)) {
      this.time = time;
    }
    let that = this;
    setTimeout(() => {
      that.animateSVG(this.self, 'out', function () {
        setTimeout(() => {
          that.pageload.className = 'pageload-overlay';
        });
      });
    }, that.time);
  }


  private animateSVG(svg: any, dir: any, cbk: any) {
    let self = svg,
      pos = 0,
      steps = dir === 'out' ? this.animate.initialPath : this.animate.openingSteps,
      stepsTotal = dir === 'out' ? this.animate.closingStepsTotal : this.animate.openingStepsTotal,
      speed = dir === 'out' ? this.animate.speedOut : this.animate.speedIn,
      easing = dir === 'out' ? this.animate.easingOut : this.animate.easingIn,
      nextStep: any;
    easing = mina[easing] || mina.linear;
    nextStep = function (pos: any) {
      if (pos > stepsTotal - 1) {
        if (cbk && typeof cbk === 'function') {
          cbk();
        }
        return;
      }
      self.animate({
        'path': steps
      }, speed, easing, function () {
        nextStep(pos);
      });
      pos++;
    };
    nextStep(pos);
  }
}
