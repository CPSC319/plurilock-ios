//
//  GestureLogger.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-26.
//  Copyright © 2016 Facebook. All rights reserved.
//

import UIKit

@objc(GestureLogger)
class GestureLogger: NSObject {
  
  
  @objc func retrievePanGestureData(appName: String, timestamp: String, gestureData: NSDictionary) -> Void {
    print("orientation portrait is: ", UIDevice.currentDevice().orientation.isPortrait)
    print("Timestamp: ", timestamp)
    print("Gesture Data: ", gestureData)
    var orientation = ""
    if UIDevice.currentDevice().orientation.isPortrait {
      orientation = "Portrait"
    } else {
      orientation = "Landscape"
    }
    _ = TouchData(appName: appName, timestamp: timestamp, deviceOrientation: orientation, gestureData: gestureData)
  }
  
  @objc func retrieveKeyData(appName: String, timestamp: String, keyData: String) {
    print("KEY IS: ", keyData)
    //for KeyData Object
  }
  
  func platform() -> String {
    var sysinfo = utsname()
    uname(&sysinfo) // ignore return value
    return NSString(bytes: &sysinfo.machine, length: Int(_SYS_NAMELEN), encoding: NSASCIIStringEncoding)! as String
  }
}
