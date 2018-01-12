// @flow

import EventEmitter from "events";
import stringify from "json-stable-stringify";
import { Buffer } from "buffer";

/** @abstract */
export class StateHistory {
  /** @ignore */
  shareMode = true;
  /** @ignore */
  localValue: any;
  /** @ignore */
  localData: string;
  /** @ignore */
  urlPath: string;
  /** @ignore */
  options: any;
  /** @ignore */
  path: string;
  /** @ignore */
  emitter = new EventEmitter();
  /** Constructor
   * @param {{onPathChange: function}} options options
   */
  constructor(options: {
    onPathChange: (path: string, localValue: any) => void,
  }) {
    this.options = options || {};
    if (this.options.onPathChange) {
      this.emitter.on("pathChange", this.options.onPathChange);
    }
    const currentState = this.parsePath();
    this.updatePath(currentState.path, null, {
      enableEvent: true,
      localData: currentState.localData,
    });
    window.addEventListener("popstate", this.onPopState, false);
  }
  /** Register listner
   * @param {function(path: string, localValue: any): void} listener listener
   */
  on(listener: (path: string, localValue: any) => void): void {
    this.emitter.on("pathChange", listener);
  }
  /** Remove listner
   * @param {function(path: string, localValue: any): void} listener listener
   */
  off(listener: Function) {
    this.emitter.removeListener("pathChange", listener);
  }
  /** Release all resources */
  close() {
    window.removeEventListener("popstate", this.onPopState, false);
  }
  /** Alias of history.back() */
  back() {
    history.back();
  }
  /** Alias of history.forward() */
  forward() {
    history.forward();
  }
  /** @ignore */
  parsePath() {
    throw new Error("not implemented");
  }
  /** @ignore */
  compoundPath(path: string, localData: any) {
    throw new Error("not implemented");
  }
  /** @ignore */
  onPopState = (e: any) => {
    const currentState = this.parsePath();
    this.updatePath(currentState.path, null, {
      enableEvent: true,
      localData: currentState.localData,
    });
  };
  /** @ignore */
  toData(value: any) {
    return value && Buffer.from(stringify(value)).toString("base64");
  }
  /** @ignore */
  fromData(data: string) {
    return data && JSON.parse(Buffer.from(data, "base64").toString());
  }
  /** Set the value to determine localValue is reflect to URL */
  setShareMode(shareMode: boolean) {
    this.shareMode = shareMode;
    this.updatePath(this.path, null, { localData: this.localData });
  }

  /**
   * Update inner state
   * @param {string} newPath newPath
   * @param {Object} localValue arbitrary value
   * @param {{title: string}} option options
   */
  updatePath(
    _newPath: string,
    localValue: any,
    option: { enableEvent?: boolean, localData: string, title?: string }
  ) {
    const newPath = _newPath || this.path;
    const { enableEvent, title } = option || {};
    let localData: string = (option || {}).localData;
    if (!localData && localValue) {
      localData = this.toData(localValue);
    }

    // param -> path(& state)
    const currentState = this.parsePath();
    const urlPath = this.compoundPath(newPath, localData);
    if (newPath !== currentState.path) {
      window.history.pushState({ localData: localData }, "", urlPath);
    } else if (
      localData !== currentState.localData ||
      urlPath !== this.urlPath
    ) {
      window.history.replaceState({ localData: localData }, "", urlPath);
    }
    if (title) {
      document.title = title;
    }
    // path(& state) -> inner, param
    if (this.urlPath !== urlPath) {
      this.urlPath = urlPath;
      if (this.path !== newPath) {
        this.path = newPath;
      }
      if (this.localData !== localData) {
        this.localData = localData;
        this.localValue = this.fromData(localData);
      }
      if (enableEvent) {
        this.emitter.emit("pathChange", {
          path: newPath,
          localValue: this.localValue,
        });
      }
    }
  }
  /**
   * get current state
   */
  getCurrentParam(): { path: string, localValue: any } {
    return {
      path: this.path,
      localValue: this.localValue,
    };
  }
}

/**
 * Implementation of StateHistory with location.pathname and locaiton.query
 * @example
 * // URL
 * /user/1234?eyJvcHRpb25zIjp7ImxhbmciOiJqYSJ9fQ==
 * // getCurrentParam()
 * { "path": "/user/1234", "localValue": {"lang": "en"}}
 */
export class PathStateHistory extends StateHistory {
  /** @ignore */
  parsePath() {
    return {
      path: location.pathname,
      localData:
        (location.search && location.search.slice(1)) ||
        (history.state && history.state.localData),
    };
  }
  /** @ignore */
  compoundPath(path: string, localData: any) {
    return path + (localData && this.shareMode ? "?" + localData : "");
  }
}

/**
 * Implementation of StateHistory with location.hash
 * @example
 * // URL
 * /somepath#/user/1234?eyJvcHRpb25zIjp7ImxhbmciOiJqYSJ9fQ==
 * // getCurrentParam()
 * { "path": "/user/1234", "localValue": {"lang": "en"}}
 */
class HashStateHistory extends StateHistory {
  /** @ignore */
  parsePath() {
    const path = (location.hash && location.hash.slice(1)) || "/";
    const match = path.match(/^([^\?]+)(?:\?(.*))?$/);
    return (
      (match && {
        path: match[1],
        localData: match[2] || (history.state && history.state.localData),
      }) ||
      {}
    );
  }
  /** @ignore */
  compoundPath(path: string, localData: any) {
    return (
      location.pathname +
      "#" +
      path +
      (localData && this.shareMode ? "?" + localData : "")
    );
  }
}

export { HashStateHistory };
