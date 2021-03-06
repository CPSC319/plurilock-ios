//
//  TouchData.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-27.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

public enum StrokeOrientation: String {
  case Left = "Left"
  case Right = "Right"
  case Up = "Up"
  case Down = "Down"
}

public enum DeviceOrientation: String {
  case Portrait = "Portrait"
  case Landscape = "Landscape"
}

public enum EventCode: String {
  case SwipeUp = "Swipe Up"
  case SwipeDown = "Swipe Down"
  case SwipeLeft = "Swipe Left"
  case SwipeRight = "Swipe Right"
  case MultiTouch = "Multi Touch"
  case Tap = "Tap"
  case KeyInput = "Key Input"
}


class TouchData: NSObject {
  var appName : String?
  var timestamp: String?
  
  var x_precision: Double?
  var y_precision: Double?
  var x_coord: Double?
  var y_coord: Double?
  
  //might not need these
  var velocity_x: Double?
  var velocity_y: Double?
  
  var force: Double?

  var deviceOrientation: DeviceOrientation
  var strokeOrientation: StrokeOrientation
  var eventCode: EventCode
  
  init(appName: String, timestamp: String, gestureData: NSDictionary, force: Double) {
    
    self.appName = appName
    self.timestamp = timestamp
    self.force = force
    
    if UIDevice.currentDevice().orientation.isPortrait {
      self.deviceOrientation = DeviceOrientation.Portrait
    } else {
      self.deviceOrientation = DeviceOrientation.Landscape
    }
    
    //parse gesture data
    self.x_precision = (gestureData["dx"]?.doubleValue)
    self.y_precision = (gestureData["dy"]?.doubleValue)
    self.x_coord = (gestureData["x0"]?.doubleValue)
    self.y_coord = (gestureData["y0"]?.doubleValue)
    self.velocity_x = (gestureData["vx"]?.doubleValue)
    self.velocity_y = (gestureData["vy"]?.doubleValue)
    
    self.strokeOrientation = StrokeOrientation.Up
    self.eventCode = EventCode.Tap
    
    //Calculate swipe orientation
    if self.velocity_x > 0 {
      self.strokeOrientation = StrokeOrientation.Right
      self.eventCode = EventCode.SwipeRight
    }
    
    if self.velocity_x < 0 {
      self.strokeOrientation = StrokeOrientation.Left
      self.eventCode = EventCode.SwipeLeft
    }
    
    if self.velocity_y > 0 {
      self.strokeOrientation = StrokeOrientation.Down
      self.eventCode = EventCode.SwipeDown
    }
    
    if self.velocity_y < 0 {
      self.strokeOrientation = StrokeOrientation.Up
      self.eventCode = EventCode.SwipeUp
    }
    
    if gestureData["numberActiveTouches"]?.doubleValue > 1 {
      self.eventCode = EventCode.MultiTouch
    }

  }
  
  func printData() {
    print("-----------------------------------------")
    print(self.appName!, "has detected new Touch Data at:", self.timestamp!)
    print("Device Orientation:", self.deviceOrientation)
    print("Stroke Orientation:", self.strokeOrientation)
    print("Event Type:", self.eventCode)
    print("X, Y position:", self.x_coord!, ",", self.y_coord!)
    print("X, Y precision:", self.x_precision!, ",", self.y_precision!)
    print("X, Y velocity:", self.velocity_x!, ",", self.velocity_y!)
    print("Force: ", self.force!)

  }
  
  func packageForServer() -> NSString {

    let dataDictionary = Dictionary<String, AnyObject>(dictionaryLiteral:
      ("evtType", self.eventCode.rawValue),
      ("timestamp", self.timestamp!),
      ("deviceOrientation", self.deviceOrientation.rawValue),
      ("strokeOrientation", self.strokeOrientation.rawValue),
      ("x-position", self.x_coord!),
      ("y-position", self.y_coord!),
      ("x-precision", self.x_precision!),
      ("y-precision", self.y_precision!),
      ("x-velocity", self.velocity_x!),
      ("y-velocity", self.velocity_y!),
      ("force", self.force!))
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
