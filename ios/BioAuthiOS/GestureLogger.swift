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
  
  @objc func retrievePanGestureData(appName: String, timestamp: String, gestureData: NSDictionary, callback: RCTResponseSenderBlock) -> Void {
    let td = TouchData(appName: appName, timestamp: timestamp, gestureData: gestureData)
   
    td.printData()
    callback([["data": "callback string"]])
    return
  }
  
  @objc func retrieveKeyData(appName: String, timestamp: String, keyData: String) {
    let kd = KeyData(appName: appName, timestamp: timestamp, keyData: keyData)
    kd.printData()
  }
  
  func platform() -> String {
    var sysinfo = utsname()
    uname(&sysinfo) // ignore return value
    return NSString(bytes: &sysinfo.machine, length: Int(_SYS_NAMELEN), encoding: NSASCIIStringEncoding)! as String
  }
}
