import prisma from "../lib/prisma.js";
import { createNewMeeting } from "../services/meeting.service.js";
import {
  createMeeting,
  deleteMeeting,
  getMeeting,
  getRecording,
  updateMeeting,
} from "../services/zoom.service.js";
import { successResponse } from "../utils/response.js";

export const meetingController = {
  scheduleMeeting: async (req, res) => {
    const { topic, startTime, duration, subscriptionId } = req.body;

    const zoomMeeting = await createMeeting({
      topic,
      startTime,
      duration,
    });

    const dbMeeting = await createNewMeeting({
      userId: req.user.id,
      zoomMeeting,
      subscriptionId: subscriptionId,
    });

    return successResponse(res, "Meeting scheduled successfully", dbMeeting);
  },

  getAllMeetings: async (req, res) => {
    const meetings = await prisma.meeting.findMany({
      where: { createdBy: req.user.id },
    });
    return successResponse(res, "Meetings fetched successfully", meetings);
  },

  getSubsciptionMeetings: async (req, res) => {
    const id = Number(req.params.id);
    const meetings = await prisma.meeting.findMany({
      where: { subscriptionId: id },
    });
    return successResponse(
      res,
      "Subscription meetings fetched successfully",
      meetings,
    );
  },

  getMeetingById: async (req, res) => {
    const meeting = await prisma.meeting.findUnique({
      where: { id: req.params.id },
    });
    const zoomMeeting = await getMeeting(meeting.zoomMeetingId);
    return successResponse(res, "Meeting fetched successfully", {
      meeting,
      zoomMeeting,
    });
  },

  deleteMeetingById: async (req, res) => {
    const meeting = await prisma.meeting.delete({
      where: { id: req.params.id },
    });
    await deleteMeeting(meeting.zoomMeetingId);
    return successResponse(res, "Meeting deleted successfully", meeting);
  },

  updateMeetingById: async (req, res) => {
    const meeting = await prisma.meeting.update({
      where: { id: req.params.id },
      data: req.body,
    });
    await updateMeeting(meeting.zoomMeetingId, req.body);
    return successResponse(res, "Meeting updated successfully", meeting);
  },

  getRecording: async (req, res) => {
    const recording = await getRecording(req.params.id);
    return successResponse(res, "Recording fetched successfully", recording);
  },

  getAllUserMeetings: async (req, res) => {
    const meetings = await prisma.meeting.findMany({
      where: { createdBy: req.user.id },
    });
    return successResponse(res, "User meetings fetched successfully", meetings);
  },
};
