import prisma from "../lib/prisma.js";

export const createNewMeeting = async ({
  userId,
  zoomMeeting,
  subscriptionId,
}) => {
  if (!zoomMeeting || !zoomMeeting.id) {
    throw new Error("Zoom meeting data is required");
  }

  return await prisma.meeting.create({
    data: {
      createdBy: userId,
      subscriptionId,
      zoomMeetingId: String(zoomMeeting.id), // Prisma schema expects String
      topic: zoomMeeting.topic,
      startTime: new Date(zoomMeeting.start_time), // convert ISO string to Date
      duration: zoomMeeting.duration,
      joinUrl: zoomMeeting.join_url,
      startUrl: zoomMeeting.start_url,
      status: zoomMeeting.status || "SCHEDULED",
    },
  });
};

// model Meeting {
//   id             Int      @id @default(autoincrement())
//   createdBy      Int
//   zoomMeetingId  String
//   topic          String
//   startTime      DateTime
//   duration       Int
//   joinUrl        String
//   startUrl       String
//   status         String
//   createdAt      DateTime @default(now())
//   updatedAt      DateTime @updatedAt
// }

export const getMeeting = async (meetingId) => {
  const meeting = await prisma.meeting.findUnique({
    where: { id: meetingId },
  });
  return meeting;
};

export const updateMeeting = async (meetingId, data) => {
  const meeting = await prisma.meeting.update({
    where: { id: meetingId },
    data,
  });
  return meeting;
};

export const deleteMeeting = async (meetingId) => {
  const meeting = await prisma.meeting.delete({
    where: { id: meetingId },
  });
  return meeting;
};
