
//  GestureLogger.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-26.
//  Copyright © 2016 Facebook. All rights reserved.
//

import UIKit

@objc(GestureLogger)
class GestureLogger: NSObject{
  
  
  var dataArray = [AnyObject]()
  
  @objc func retrievePanGestureData(appName: String, timestamp: String, gestureData: NSDictionary, callback: RCTResponseSenderBlock) -> Void {
    let td = TouchData(appName: appName, timestamp: timestamp, gestureData: gestureData)
    let json = td.packageForServer()
    
    if (dataArray.count == 10) {
      print("ABOUT TO CALLBACK")
      callback([dataArray])
      dataArray = [AnyObject]()
    } else {
      dataArray.append(json)
    }
    
    return
  }
  
  @objc func retrieveKeyData(appName: String, timestamp: String, keyData: String, callback: RCTResponseSenderBlock) {
    let kd = KeyData(appName: appName, timestamp: timestamp, keyData: keyData)
    let json = kd.packageForServer()
    if (dataArray.count == 10) {
      print("ABOUT TO CALLBACK")
      callback([dataArray])
      dataArray = [AnyObject]()
    } else {
      dataArray.append(json)
    }
  }
  
  func platform() -> String {
    var sysinfo = utsname()
    uname(&sysinfo) // ignore return value
    return NSString(bytes: &sysinfo.machine, length: Int(_SYS_NAMELEN), encoding: NSASCIIStringEncoding)! as String
  }

  
}
