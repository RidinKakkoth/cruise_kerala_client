import { Box, Container, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <div>
      <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
            © 2023 Cruise by RIDIN. All rights reserved.

            </Typography>
            
          </Container>
        </Box>
    </div>
  )
}

export default Footer
