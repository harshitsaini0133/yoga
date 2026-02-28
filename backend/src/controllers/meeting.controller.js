import prisma from "../lib/prisma.js";
import { createNewMeeting } from "../services/meeting.service.js";
import {
  createMeeting,
  deleteMeeting,
  getMeeting,
  getRecording,
  updateMeeting,
} from "../services/zoom.service.js";

export const meetingController = {
  scheduleMeeting: async (req, res) => {
    const { topic, startTime, duration, subscriptionId } = req.body;

    console.log("req.user", req.user);
    console.log(topic, startTime, duration, subscriptionId);
    const zoomMeeting = await createMeeting({
      topic,
      startTime,
      duration,
    });

    console.log(zoomMeeting);
    console.log(req.user.id);
    const dbMeeting = await createNewMeeting({
      userId: req.user.id,
      zoomMeeting,
      subscriptionId: subscriptionId,
    });

    res.json(dbMeeting);
  },

  getAllMeetings: async (req, res) => {
    console.log("req.user", req.user);
    const meetings = await prisma.meeting.findMany({
      where: { createdBy: req.user.id },
    });
    console.log("meetings", meetings);
    res.json(meetings);
  },

  getSubsciptionMeetings: async (req, res) => {
    const id = Number(req.params.id);
    const meetings = await prisma.meeting.findMany({
      where: { subscriptionId: id },
    });
    res.json(meetings);
  },

  getMeetingById: async (req, res) => {
    const meeting = await prisma.meeting.findUnique({
      where: { id: req.params.id },
    });
    await getMeeting(meeting.zoomMeetingId);
    res.json(meeting, zoomMeeting);
  },

  deleteMeetingById: async (req, res) => {
    const meeting = await prisma.meeting.delete({
      where: { id: req.params.id },
    });
    await deleteMeeting(meeting.zoomMeetingId);
    res.json(meeting, zoomMeeting);
  },

  updateMeetingById: async (req, res) => {
    const meeting = await prisma.meeting.update({
      where: { id: req.params.id },
      data: req.body,
    });
    await updateMeeting(meeting.zoomMeetingId, req.body);
    res.json(meeting);
  },

  getRecording: async (req, res) => {
    const recording = await getRecording(req.params.id);
    res.json(recording);
  },

  getAllUserMeetings: async (req, res) => {
    console.log("req.user", req.user);
    const meetings = await prisma.meeting.findMany({
      where: { createdBy: req.user.id },
    });
    console.log("meetings", meetings);
    res.json(meetings);
  },
};
