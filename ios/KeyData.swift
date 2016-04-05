//
//  KeyData.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-29.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

class KeyData: NSObject {
  private var appName : String?
  private var timestamp: String?
  
  
  private var deviceOrientation: DeviceOrientation
  private var eventCode: EventCode
  
  private var keyData: String?
  
  init(appName: String, timestamp: String, keyData: String) {
    
    self.appName = appName
    self.timestamp = timestamp
    
    if UIDevice.currentDevice().orientation.isPortrait {
      self.deviceOrientation = DeviceOrientation.Portrait
    } else {
      self.deviceOrientation = DeviceOrientation.Landscape
    }

    self.eventCode = EventCode.KeyInput
    self.keyData = keyData
  }
  
  func printData() {
    print("-----------------------------------------")
    print(self.appName!, "has detected new Key Input Data at:", self.timestamp!)
    print("Device Orientation:", self.deviceOrientation)
    print("Event Type:", self.eventCode)
    print("Key Data:", self.keyData!)

  }
  
  func packageForServer() -> NSString{
    /*
  
      {
        evtType: mono
        key: self.keyData
        timestamp: self.timestamp
        deviceOrientation: self.deviceOrientation
      }
    */
    
    
    let dataDictionary = Dictionary<String, AnyObject>(dictionaryLiteral:
      ("evtType", "mono"),
      ("key", self.keyData!),
      ("timestamp", self.timestamp!),
      ("deviceOrientation", self.deviceOrientation.rawValue))
    do {
      let data = try NSJSONSerialization.dataWithJSONObject(dataDictionary, options: NSJSONWritingOptions.init(rawValue: 8))
      
      let jsonString = NSString(data: data,
        encoding: NSASCIIStringEncoding)
      
      return jsonString! as String
      
    } catch let error as NSError {
      print(error)
    }
    
    return ""
    
  }
}