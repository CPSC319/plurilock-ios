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
  private var appName : String?
  private var timestamp: String?
  
  private var x_precision: Double?
  private var y_precision: Double?
  private var x_coord: Double?
  private var y_coord: Double?
  
  //might not need these
  private var velocity_x: Double?
  private var velocity_y: Double?

  private var deviceOrientation: DeviceOrientation
  private var strokeOrientation: StrokeOrientation
  private var eventCode: EventCode
  
  init(appName: String, timestamp: String, gestureData: NSDictionary) {
    
    self.appName = appName
    self.timestamp = timestamp
    
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
    
    //TODO: Calculate area of finger
    
    
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
    
    //let sc = ServerController()
    //let json = packageForServer()
    //sc.writeToServer(json)
  }
  
  func packageForServer() -> String {
    
    
    
    let dataDictionary = Dictionary<String, String>(dictionaryLiteral: ("evtType", self.eventCode.rawValue), ("timestamp", self.timestamp!))
//      ["evtType": self.eventCode,
//        "timestamp": self.timestamp,
//        "deviceOrientation": self.deviceOrientation,
//        "strokeOrientation": self.strokeOrientation,
//        "x-position": self.x_coord,
//        "y-position": self.y_coord,
//        "x-precision": self.x_precision,
//        "y-precision": self.y_precision,
//        "x-velocity": self.velocity_x,
//        "y-velocity": self.velocity_y]
    do {
    let data = try NSJSONSerialization.dataWithJSONObject(dataDictionary, options: NSJSONWritingOptions.PrettyPrinted)

      let jsonString = NSString(data: data,
        encoding: NSASCIIStringEncoding)
    //print("CONVERTING TOUCH DATA TO JSON: ", theJSONText!)
      return String(jsonString)
    
    } catch let error as NSError {
      print(error)
    }
    
    return ""
  }
  
}
