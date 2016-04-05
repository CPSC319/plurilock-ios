//
//  ServerController.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-03-14.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import Starscream

@objc(ServerController)
class ServerController: NSObject, WebSocketDelegate {
  
  var socket = WebSocket(url: NSURL(string: "ws://btdemo.plurilock.com:8095")!)
  
//  var sampleData = {
//    "btClientType": "iOS",
//    "btClientVersion":"1.0",
//    "userID":"Youn",
//    "domain":"team2",
//    "data":[{"evtType":"di","fromKey":65,"toKey":70,"span":23}]
//  }
  
  override init() {
    super.init()
    //let socket = WebSocket(url: NSURL(string: "ws://btdemo.plurilock.com:8095")!)
    print("CREATING SERVER CONTROLLER")
    socket.delegate = self
  }
   
  @objc func connectToServer(str: String) {
    print("CONNECTING TO SERVER ", str)
    socket.connect()
  }
  
  @objc func writeToServer(str: String) {
    //socket.connect()
    if (socket.isConnected) {
        print("WRITING TO SERVER ", str)
        socket.writeString(str)
    }

  }
  
  func websocketDidConnect(socket: WebSocket) {
    print("websocket is connected")
    writeToServer("TEST WRITE TO SERVER")
  }
  
  func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
    print("websocket is disconnected: \(error?.localizedDescription)")
  }
  
  func websocketDidReceiveMessage(socket: WebSocket, text: String) {
    print("got some text: \(text)")
    if (socket.isConnected) {
     print("SOCKET STILL CONNECTED")
      socket.writeString("writing string")
    } else {
      print("SOCKET NOT CONNECTED")
    }
  }
  
  func websocketDidReceiveData(socket: WebSocket, data: NSData) {
    print("got some data: \(data.length)")
  }
  
  func getConnectionStatus() -> Bool {
    return socket.isConnected
  }
}