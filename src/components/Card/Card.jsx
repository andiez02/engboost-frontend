import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Cards = React.memo(({ card, onRemove }) => (
  <Fade in={true} timeout={500}>
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box sx={{ display: "flex", position: "relative" }}>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.object}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <CardContent sx={{ width: "70%", p: 2 }}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            gutterBottom
          >
            {card.object}
          </Typography>

          <Box sx={{ display: "flex", mt: 1 }}>
            <Box sx={{ width: "50%" }}>
              <Typography variant="caption" color="text.secondary">
                TIẾNG ANH
              </Typography>
              <Typography variant="body1">{card.english}</Typography>
            </Box>

            <Box sx={{ width: "50%" }}>
              <Typography variant="caption" color="text.secondary">
                TIẾNG VIỆT
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {card.vietnamese}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": {
              bgcolor: "#f44336",
              color: "white",
            },
          }}
          className="interceptor-loading"
          onClick={() => onRemove(card.id)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  </Fade>
));

export default Cards;
